import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { OperationalEventV1 } from '../data/version1/OperationalEventV1';
import { IOperationalEventsPersistence } from './IOperationalEventsPersistence';
export declare class OperationalEventsMemoryPersistence extends IdentifiableMemoryPersistence<OperationalEventV1, string> implements IOperationalEventsPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<OperationalEventV1>) => void): void;
}
