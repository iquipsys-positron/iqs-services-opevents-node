let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { OperationalEventV1 } from '../../src/data/version1/OperationalEventV1';
import {SeverityV1 } from '../../src/data/version1/SeverityV1';

import { IOperationalEventsPersistence } from '../../src/persistence/IOperationalEventsPersistence';

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
let EVENT3: OperationalEventV1 = {
    id: '3',
    org_id: '2',
    create_time: new Date(),
    time: new Date(new Date().getTime() + 1000),
    type: 'manual',
    severity: SeverityV1.Low,
    description: 'Test event #3'
};

export class OperationalEventsPersistenceFixture {
    private _persistence: IOperationalEventsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateOperationalEvents(done) {
        async.series([
        // Create one event
            (callback) => {
                this._persistence.create(
                    null,
                    EVENT1,
                    (err, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.equal(event.org_id, EVENT1.org_id);
                        assert.equal(event.type, EVENT1.type);
                        assert.equal(event.description, EVENT1.description);

                        callback();
                    }
                );
            },
        // Create another event
            (callback) => {
                this._persistence.create(
                    null,
                    EVENT2,
                    (err, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.equal(event.org_id, EVENT2.org_id);
                        assert.equal(event.type, EVENT2.type);
                        assert.equal(event.description, EVENT2.description);

                        callback();
                    }
                );
            },
        // Create yet another event
            (callback) => {
                this._persistence.create(
                    null,
                    EVENT3,
                    (err, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.equal(event.org_id, EVENT3.org_id);
                        assert.equal(event.type, EVENT3.type);
                        assert.equal(event.description, EVENT3.description);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let event1: OperationalEventV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateOperationalEvents(callback);
            },
        // Get all events
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        event1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the event
            (callback) => {
                event1.description = 'Updated event 1';

                this._persistence.update(
                    null,
                    event1,
                    (err, event) => {
                        assert.isNull(err);

                        assert.isObject(event);
                        assert.equal(event.description, 'Updated event 1');
                        assert.equal(event.id, event1.id);

                        callback();
                    }
                );
            },
        // Delete event
            (callback) => {
                this._persistence.deleteById(
                    null,
                    event1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete event
            (callback) => {
                this._persistence.getOneById(
                    null,
                    event1.id,
                    (err, event) => {
                        assert.isNull(err);

                        assert.isNull(event || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create events
            (callback) => {
                this.testCreateOperationalEvents(callback);
            },
        // Get events filtered by org_id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        org_id: '1'
                    }),
                    new PagingParams(),
                    (err, events) => {
                        assert.isNull(err);

                        assert.isObject(events);
                        assert.lengthOf(events.data, 2);

                        callback();
                    }
                );
            },
        // Get events by types
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        types: 'auto,resolution'
                    }),
                    new PagingParams(),
                    (err, events) => {
                        assert.isNull(err);

                        assert.isObject(events);
                        assert.lengthOf(events.data, 1);

                        callback();
                    }
                );
            },
        // Get events filtered by severity
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        min_severity: SeverityV1.Medium
                    }),
                    new PagingParams(),
                    (err, events) => {
                        assert.isNull(err);

                        assert.isObject(events);
                        assert.lengthOf(events.data, 2);

                        callback();
                    }
                );
            },
        // Get events filtered by severity
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        from_time: EVENT1.time,
                        to_time: EVENT3.time
                    }),
                    new PagingParams(),
                    (err, events) => {
                        assert.isNull(err);

                        assert.isObject(events);
                        assert.lengthOf(events.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    }

}
