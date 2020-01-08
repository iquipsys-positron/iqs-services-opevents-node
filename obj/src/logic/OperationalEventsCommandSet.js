"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const OperationalEventV1Schema_1 = require("../data/version1/OperationalEventV1Schema");
class OperationalEventsCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetOperationalEventsCommand());
        this.addCommand(this.makeLogOperationalEventCommand());
        this.addCommand(this.makeDeleteOperationalEventByIdCommand());
    }
    makeGetOperationalEventsCommand() {
        return new pip_services3_commons_node_2.Command("get_events", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getEvents(correlationId, filter, paging, callback);
        });
    }
    makeLogOperationalEventCommand() {
        return new pip_services3_commons_node_2.Command("log_event", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('event', new OperationalEventV1Schema_1.OperationalEventV1Schema()), (correlationId, args, callback) => {
            let event = args.get("event");
            this._logic.logEvent(correlationId, event, callback);
        });
    }
    makeDeleteOperationalEventByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_event_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('event_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let eventId = args.getAsNullableString("event_id");
            this._logic.deleteEventById(correlationId, eventId, callback);
        });
    }
}
exports.OperationalEventsCommandSet = OperationalEventsCommandSet;
//# sourceMappingURL=OperationalEventsCommandSet.js.map