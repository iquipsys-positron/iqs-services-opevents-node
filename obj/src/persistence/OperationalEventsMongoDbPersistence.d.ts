import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { OperationalEventV1 } from '../data/version1/OperationalEventV1';
import { IOperationalEventsPersistence } from './IOperationalEventsPersistence';
export declare class OperationalEventsMongoDbPersistence extends IdentifiableMongoDbPersistence<OperationalEventV1, string> implements IOperationalEventsPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<OperationalEventV1>) => void): void;
}
