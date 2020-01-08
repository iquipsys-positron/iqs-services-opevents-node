import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { OperationalEventsMongoDbPersistence } from '../persistence/OperationalEventsMongoDbPersistence';
import { OperationalEventsFilePersistence } from '../persistence/OperationalEventsFilePersistence';
import { OperationalEventsMemoryPersistence } from '../persistence/OperationalEventsMemoryPersistence';
import { OperationalEventsController } from '../logic/OperationalEventsController';
import { OperationalEventsHttpServiceV1 } from '../services/version1/OperationalEventsHttpServiceV1';

export class OperationalEventsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("iqs-services-opevents", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("iqs-services-opevents", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("iqs-services-opevents", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("iqs-services-opevents", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("iqs-services-opevents", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("iqs-services-opevents", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(OperationalEventsServiceFactory.MemoryPersistenceDescriptor, OperationalEventsMemoryPersistence);
		this.registerAsType(OperationalEventsServiceFactory.FilePersistenceDescriptor, OperationalEventsFilePersistence);
		this.registerAsType(OperationalEventsServiceFactory.MongoDbPersistenceDescriptor, OperationalEventsMongoDbPersistence);
		this.registerAsType(OperationalEventsServiceFactory.ControllerDescriptor, OperationalEventsController);
		this.registerAsType(OperationalEventsServiceFactory.HttpServiceDescriptor, OperationalEventsHttpServiceV1);
	}
	
}
