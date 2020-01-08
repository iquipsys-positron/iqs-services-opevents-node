let OperationalEventsProcess = require('../obj/src/container/OperationalEventsProcess').OperationalEventsProcess;

try {
    new OperationalEventsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
