import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class OperationalEventV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('org_id', TypeCode.String);
        this.withOptionalProperty('create_time', TypeCode.DateTime);
        this.withOptionalProperty('creator_id', TypeCode.String);

        this.withRequiredProperty('type', TypeCode.String);
        this.withOptionalProperty('rule_id', TypeCode.String);
        this.withRequiredProperty('severity', TypeCode.Integer);
        this.withRequiredProperty('time', TypeCode.DateTime);
        this.withOptionalProperty('pos', null); //TypeCode.Object);

        this.withOptionalProperty('group_id', TypeCode.String);
        this.withOptionalProperty('object_id', TypeCode.String);
        this.withOptionalProperty('assign_id', TypeCode.String);
        this.withOptionalProperty('loc_id', TypeCode.String);
        this.withOptionalProperty('zone_id', TypeCode.String);
        this.withOptionalProperty('ref_event_id', TypeCode.String);

        this.withOptionalProperty('description', TypeCode.String);
        this.withOptionalProperty('expected_value', null);
        this.withOptionalProperty('actual_value', null);
        this.withOptionalProperty('value_units', TypeCode.String);
    }
}
