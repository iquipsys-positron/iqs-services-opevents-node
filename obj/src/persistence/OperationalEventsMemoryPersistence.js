"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
class OperationalEventsMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 1000;
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.description, search))
            return true;
        if (this.matchString(item.expected_value, search))
            return true;
        return false;
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let type = filter.getAsNullableString('type');
        let types = filter.getAsObject('types');
        let orgId = filter.getAsNullableString('org_id');
        let objectId = filter.getAsNullableString('object_id');
        let groupId = filter.getAsNullableString('group_id');
        let ruleId = filter.getAsNullableString('rule_id');
        let refEventId = filter.getAsNullableString('ref_event_id');
        let minSeverity = filter.getAsNullableInteger('min_severity');
        let fromTime = filter.getAsNullableDateTime('from_time');
        let toTime = filter.getAsNullableDateTime('to_time');
        // Process types filter
        if (_.isString(types))
            types = types.split(',');
        if (!_.isArray(types))
            types = null;
        return (item) => {
            if (id && item.id != id)
                return false;
            if (type && item.type != type)
                return false;
            if (types && _.indexOf(types, item.type) < 0)
                return false;
            if (orgId && item.org_id != orgId)
                return false;
            if (objectId && item.object_id != objectId && item.assign_id != objectId)
                return false;
            if (groupId && item.group_id != groupId)
                return false;
            if (ruleId && item.rule_id != ruleId)
                return false;
            if (refEventId && item.ref_event_id != refEventId)
                return false;
            if (minSeverity && item.severity < minSeverity)
                return false;
            if (fromTime && item.time < fromTime)
                return false;
            if (toTime && item.time >= toTime)
                return false;
            if (search && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.OperationalEventsMemoryPersistence = OperationalEventsMemoryPersistence;
//# sourceMappingURL=OperationalEventsMemoryPersistence.js.map