"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const OperationalEventsServiceFactory_1 = require("../build/OperationalEventsServiceFactory");
class OperationalEventsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("operational_events", "Operational events microservice");
        this._factories.add(new OperationalEventsServiceFactory_1.OperationalEventsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.OperationalEventsProcess = OperationalEventsProcess;
//# sourceMappingURL=OperationalEventsProcess.js.map