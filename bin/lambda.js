let OperationalEventsLambdaFunction = require('../obj/src/container/OperationalEventsLambdaFunction').OperationalEventsLambdaFunction;

module.exports = new OperationalEventsLambdaFunction().getHandler();