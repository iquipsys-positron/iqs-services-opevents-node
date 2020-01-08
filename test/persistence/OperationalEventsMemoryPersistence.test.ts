import { ConfigParams } from 'pip-services3-commons-node';

import { OperationalEventsMemoryPersistence } from '../../src/persistence/OperationalEventsMemoryPersistence';
import { OperationalEventsPersistenceFixture } from './OperationalEventsPersistenceFixture';

suite('OperationalEventsMemoryPersistence', ()=> {
    let persistence: OperationalEventsMemoryPersistence;
    let fixture: OperationalEventsPersistenceFixture;
    
    setup((done) => {
        persistence = new OperationalEventsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new OperationalEventsPersistenceFixture(persistence);
        
        persistence.open(null, done);
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