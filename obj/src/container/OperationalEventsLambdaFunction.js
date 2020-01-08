"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const OperationalEventsServiceFactory_1 = require("../build/OperationalEventsServiceFactory");
class OperationalEventsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("operational_events", "Operational events function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-opevents', 'controller', 'default', '*', '*'));
        this._factories.add(new OperationalEventsServiceFactory_1.OperationalEventsServiceFactory());
    }
}
exports.OperationalEventsLambdaFunction = OperationalEventsLambdaFunction;
exports.handler = new OperationalEventsLambdaFunction().getHandler();
//# sourceMappingURL=OperationalEventsLambdaFunction.js.map