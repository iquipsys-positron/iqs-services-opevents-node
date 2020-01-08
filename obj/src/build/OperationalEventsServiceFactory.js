"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const OperationalEventsMongoDbPersistence_1 = require("../persistence/OperationalEventsMongoDbPersistence");
const OperationalEventsFilePersistence_1 = require("../persistence/OperationalEventsFilePersistence");
const OperationalEventsMemoryPersistence_1 = require("../persistence/OperationalEventsMemoryPersistence");
const OperationalEventsController_1 = require("../logic/OperationalEventsController");
const OperationalEventsHttpServiceV1_1 = require("../services/version1/OperationalEventsHttpServiceV1");
class OperationalEventsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(OperationalEventsServiceFactory.MemoryPersistenceDescriptor, OperationalEventsMemoryPersistence_1.OperationalEventsMemoryPersistence);
        this.registerAsType(OperationalEventsServiceFactory.FilePersistenceDescriptor, OperationalEventsFilePersistence_1.OperationalEventsFilePersistence);
        this.registerAsType(OperationalEventsServiceFactory.MongoDbPersistenceDescriptor, OperationalEventsMongoDbPersistence_1.OperationalEventsMongoDbPersistence);
        this.registerAsType(OperationalEventsServiceFactory.ControllerDescriptor, OperationalEventsController_1.OperationalEventsController);
        this.registerAsType(OperationalEventsServiceFactory.HttpServiceDescriptor, OperationalEventsHttpServiceV1_1.OperationalEventsHttpServiceV1);
    }
}
exports.OperationalEventsServiceFactory = OperationalEventsServiceFactory;
OperationalEventsServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-opevents", "factory", "default", "default", "1.0");
OperationalEventsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-opevents", "persistence", "memory", "*", "1.0");
OperationalEventsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-opevents", "persistence", "file", "*", "1.0");
OperationalEventsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-opevents", "persistence", "mongodb", "*", "1.0");
OperationalEventsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-opevents", "controller", "default", "*", "1.0");
OperationalEventsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-opevents", "service", "http", "*", "1.0");
//# sourceMappingURL=OperationalEventsServiceFactory.js.map