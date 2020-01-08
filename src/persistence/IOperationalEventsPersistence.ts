import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';

import { OperationalEventV1 } from '../data/version1/OperationalEventV1';

export interface IOperationalEventsPersistence extends IGetter<OperationalEventV1, string>, IWriter<OperationalEventV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<OperationalEventV1>) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: OperationalEventV1) => void): void;

    create(correlationId: string, item: OperationalEventV1, 
        callback: (err: any, item: OperationalEventV1) => void): void;

    update(correlationId: string, item: OperationalEventV1, 
        callback: (err: any, item: OperationalEventV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: OperationalEventV1) => void): void;
}
