import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { OperationalEventsMemoryPersistence } from './OperationalEventsMemoryPersistence';
import { OperationalEventV1 } from '../data/version1/OperationalEventV1';
export declare class OperationalEventsFilePersistence extends OperationalEventsMemoryPersistence {
    protected _persister: JsonFilePersister<OperationalEventV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
