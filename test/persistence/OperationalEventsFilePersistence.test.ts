import { ConfigParams } from 'pip-services3-commons-node';

import { OperationalEventsFilePersistence } from '../../src/persistence/OperationalEventsFilePersistence';
import { OperationalEventsPersistenceFixture } from './OperationalEventsPersistenceFixture';

suite('OperationalEventsFilePersistence', ()=> {
    let persistence: OperationalEventsFilePersistence;
    let fixture: OperationalEventsPersistenceFixture;
    
    setup((done) => {
        persistence = new OperationalEventsFilePersistence('./data/operational_events.test.json');

        fixture = new OperationalEventsPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});