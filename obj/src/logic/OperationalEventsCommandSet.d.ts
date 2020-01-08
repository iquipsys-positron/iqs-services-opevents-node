import { CommandSet } from 'pip-services3-commons-node';
import { IOperationalEventsController } from './IOperationalEventsController';
export declare class OperationalEventsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IOperationalEventsController);
    private makeGetOperationalEventsCommand;
    private makeLogOperationalEventCommand;
    private makeDeleteOperationalEventByIdCommand;
}
