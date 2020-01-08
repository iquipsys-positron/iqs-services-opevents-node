"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_data_node_1 = require("pip-services3-data-node");
const OperationalEventsMemoryPersistence_1 = require("./OperationalEventsMemoryPersistence");
class OperationalEventsFilePersistence extends OperationalEventsMemoryPersistence_1.OperationalEventsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_node_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.OperationalEventsFilePersistence = OperationalEventsFilePersistence;
//# sourceMappingURL=OperationalEventsFilePersistence.js.map