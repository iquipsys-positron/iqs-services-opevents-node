import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { OperationalEventV1 } from '../data/version1/OperationalEventV1';
import { OperationalEventV1Schema } from '../data/version1/OperationalEventV1Schema';
import { IOperationalEventsController } from './IOperationalEventsController';

export class OperationalEventsCommandSet extends CommandSet {
    private _logic: IOperationalEventsController;

    constructor(logic: IOperationalEventsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetOperationalEventsCommand());
		this.addCommand(this.makeLogOperationalEventCommand());
		this.addCommand(this.makeDeleteOperationalEventByIdCommand());
    }

	private makeGetOperationalEventsCommand(): ICommand {
		return new Command(
			"get_events",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getEvents(correlationId, filter, paging, callback);
            }
		);
	}

	private makeLogOperationalEventCommand(): ICommand {
		return new Command(
			"log_event",
			new ObjectSchema(true)
				.withRequiredProperty('event', new OperationalEventV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let event = args.get("event");
                this._logic.logEvent(correlationId, event, callback);
            }
		);
	}
	
	private makeDeleteOperationalEventByIdCommand(): ICommand {
		return new Command(
			"delete_event_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('event_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let eventId = args.getAsNullableString("event_id");
                this._logic.deleteEventById(correlationId, eventId, callback);
			}
		);
	}

}