let _ = require('lodash');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { DateTimeConverter } from 'pip-services3-commons-node';

import { OperationalEventV1 } from '../data/version1/OperationalEventV1';
import { IOperationalEventsPersistence } from '../persistence/IOperationalEventsPersistence';
import { IOperationalEventsController } from './IOperationalEventsController';
import { OperationalEventsCommandSet } from './OperationalEventsCommandSet';

export class OperationalEventsController implements  IConfigurable, IReferenceable, ICommandable, IOperationalEventsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'iqs-services-opevents:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(OperationalEventsController._defaultConfig);
    private _persistence: IOperationalEventsPersistence;
    private _commandSet: OperationalEventsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IOperationalEventsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new OperationalEventsCommandSet(this);
        return this._commandSet;
    }
    
    public getEvents(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<OperationalEventV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    private fixEvent(event: OperationalEventV1): void {
        if (_.isString(event.pos))
            event.pos = JSON.parse(event.pos);

        event.create_time = DateTimeConverter.toDateTimeWithDefault(event.create_time, new Date());
        event.time = DateTimeConverter.toDateTimeWithDefault(event.time, new Date());
    }

    public logEvent(correlationId: string, event: OperationalEventV1, 
        callback: (err: any, event: OperationalEventV1) => void): void {
        this.fixEvent(event);
        this._persistence.create(correlationId, event, callback);
    }

    public deleteEventById(correlationId: string, id: string,
        callback: (err: any, event: OperationalEventV1) => void): void {  
        this._persistence.deleteById(correlationId, id, callback);
    }

}
