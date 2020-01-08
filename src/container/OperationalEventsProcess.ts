import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import { OperationalEventsServiceFactory } from '../build/OperationalEventsServiceFactory';

export class OperationalEventsProcess extends ProcessContainer {

    public constructor() {
        super("operational_events", "Operational events microservice");
        this._factories.add(new OperationalEventsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
