import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class OperationalEventsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/operational_events');
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-opevents', 'controller', 'default', '*', '1.0'));
    }
}