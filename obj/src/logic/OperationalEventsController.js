"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const OperationalEventsCommandSet_1 = require("./OperationalEventsCommandSet");
class OperationalEventsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(OperationalEventsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new OperationalEventsCommandSet_1.OperationalEventsCommandSet(this);
        return this._commandSet;
    }
    getEvents(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    fixEvent(event) {
        if (_.isString(event.pos))
            event.pos = JSON.parse(event.pos);
        event.create_time = pip_services3_commons_node_3.DateTimeConverter.toDateTimeWithDefault(event.create_time, new Date());
        event.time = pip_services3_commons_node_3.DateTimeConverter.toDateTimeWithDefault(event.time, new Date());
    }
    logEvent(correlationId, event, callback) {
        this.fixEvent(event);
        this._persistence.create(correlationId, event, callback);
    }
    deleteEventById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
exports.OperationalEventsController = OperationalEventsController;
OperationalEventsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'iqs-services-opevents:persistence:*:*:1.0');
//# sourceMappingURL=OperationalEventsController.js.map