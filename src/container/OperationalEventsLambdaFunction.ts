import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { OperationalEventsServiceFactory } from '../build/OperationalEventsServiceFactory';

export class OperationalEventsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("operational_events", "Operational events function");
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-opevents', 'controller', 'default', '*', '*'));
        this._factories.add(new OperationalEventsServiceFactory());
    }
}

export const handler = new OperationalEventsLambdaFunction().getHandler();