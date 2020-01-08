import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { OperationalEventV1 } from '../data/version1/OperationalEventV1';
import { IOperationalEventsController } from './IOperationalEventsController';
export declare class OperationalEventsController implements IConfigurable, IReferenceable, ICommandable, IOperationalEventsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getEvents(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<OperationalEventV1>) => void): void;
    private fixEvent;
    logEvent(correlationId: string, event: OperationalEventV1, callback: (err: any, event: OperationalEventV1) => void): void;
    deleteEventById(correlationId: string, id: string, callback: (err: any, event: OperationalEventV1) => void): void;
}
