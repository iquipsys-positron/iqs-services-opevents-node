"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class OperationalEventsMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('operational_events');
        super.ensureIndex({ org_id: 1, time: -1 });
        super.ensureIndex({ org_id: 1, ref_event_id: 1, type: 1 });
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ description: { $regex: searchRegex } });
            searchCriteria.push({ value: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });
        let types = filter.getAsObject('types');
        if (_.isString(types))
            types = types.split(',');
        if (_.isArray(types))
            criteria.push({ type: { $in: types } });
        let org_id = filter.getAsNullableString('org_id');
        if (org_id != null)
            criteria.push({ org_id: org_id });
        let objectId = filter.getAsNullableString('object_id');
        if (objectId != null) {
            criteria.push({
                $or: [
                    { object_id: objectId },
                    { assign_id: objectId }
                ]
            });
        }
        let groupId = filter.getAsNullableString('group_id');
        if (groupId != null)
            criteria.push({ group_id: groupId });
        let ruleId = filter.getAsNullableString('rule_id');
        if (ruleId != null)
            criteria.push({ rule_id: ruleId });
        let refEventId = filter.getAsNullableString('ref_event_id');
        if (refEventId != null)
            criteria.push({ ref_event_id: refEventId });
        let minSeverity = filter.getAsNullableInteger('min_severity');
        if (minSeverity != null)
            criteria.push({ severity: { $gte: minSeverity } });
        let fromTime = filter.getAsNullableDateTime('from_time');
        if (fromTime != null)
            criteria.push({ time: { $gte: fromTime } });
        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            criteria.push({ time: { $lt: toTime } });
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, "-time", null, callback);
    }
}
exports.OperationalEventsMongoDbPersistence = OperationalEventsMongoDbPersistence;
//# sourceMappingURL=OperationalEventsMongoDbPersistence.js.map