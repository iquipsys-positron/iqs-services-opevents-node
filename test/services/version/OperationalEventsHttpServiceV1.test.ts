let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { OperationalEventV1 } from '../../../src/data/version1/OperationalEventV1';
import { SeverityV1 } from '../../../src/data/version1/SeverityV1';
import { OperationalEventsMemoryPersistence } from '../../../src/persistence/OperationalEventsMemoryPersistence';
import { OperationalEventsController } from '../../../src/logic/OperationalEventsController';
import { OperationalEventsHttpServiceV1 } from '../../../src/services/version1/OperationalEventsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('OperationalEventsHttpServiceV1', ()=> {    
    let service: OperationalEventsHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new OperationalEventsMemoryPersistence();
        let controller = new OperationalEventsController();

        service = new OperationalEventsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-opevents', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-opevents', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('iqs-services-opevents', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let event1, event2;

        async.series([
        // Create one event
            (callback) => {
                rest.post('/v1/operational_events/log_event',
                    {
                        event: EVENT1
                    },
                    (err, req, res, event) => {
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
                rest.post('/v1/operational_events/log_event', 
                    {
                        event: EVENT2
                    },
                    (err, req, res, event) => {
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
                rest.post('/v1/operational_events/get_events',
                    {},
                    (err, req, res, page) => {
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