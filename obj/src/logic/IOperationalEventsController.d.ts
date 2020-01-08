import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { OperationalEventV1 } from '../data/version1/OperationalEventV1';
export interface IOperationalEventsController {
    getEvents(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<OperationalEventV1>) => void): void;
    logEvent(correlationId: string, event: OperationalEventV1, callback: (err: any, event: OperationalEventV1) => void): void;
    deleteEventById(correlationId: string, event_id: string, callback: (err: any, event: OperationalEventV1) => void): void;
}
