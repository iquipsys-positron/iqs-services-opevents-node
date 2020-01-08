let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { OperationalEventV1 } from '../../src/data/version1/OperationalEventV1';
import { SeverityV1 } from '../../src/data/version1/SeverityV1';
import { OperationalEventsMemoryPersistence } from '../../src/persistence/OperationalEventsMemoryPersistence';
import { OperationalEventsController } from '../../src/logic/OperationalEventsController';
import { OperationalEventsLambdaFunction } from '../../src/container/OperationalEventsLambdaFunction';

let EVENT1: OperationalEventV1 = {
    id: '1',
    org_id: '1',
    create_time: new Date(),
    time: new Date(),
    rule_id: '1',
    type: 'auto',
    severity: SeverityV1.Medium,
    description: 'Test event #1'
};
let EVENT2: OperationalEventV1 = {
    id: '2',
    org_id: '1',
    create_time: new Date(),
    time: new Date(),
    type: 'manual',
    severity: SeverityV1.High,
    description: 'Test event #2'
};

suite('OperationalEventsLambdaFunction', ()=> {
    let lambda: OperationalEventsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'iqs-services-opevents:persistence:memory:default:1.0',
            'controller.descriptor', 'iqs-services-opevents:controller:default:default:1.0'
        );

        lambda = new OperationalEventsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var event1, event2;

        async.series([
        // Create one event
            (callback) => {
                lambda.act(
                    {
                        role: 'operational_events',
                        cmd: 'log_event',
                        event: EVENT1
                    },
                    (err, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.equal(event.org_id, EVENT1.org_id);
                        assert.equal(event.type, EVENT1.type);
                        assert.equal(event.description, EVENT1.description);

                        event1 = event;

                        callback();
                    }
                );
            },
        // Create another event
            (callback) => {
                lambda.act(
                    {
                        role: 'operational_events',
                        cmd: 'log_event',
                        event: EVENT2
                    },
                    (err, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.equal(event.org_id, EVENT2.org_id);
                        assert.equal(event.type, EVENT2.type);
                        assert.equal(event.description, EVENT2.description);

                        event2 = event;

                        callback();
                    }
                );
            },
        // Get all events
            (callback) => {
                lambda.act(
                    {
                        role: 'operational_events',
                        cmd: 'get_events' 
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    });
});