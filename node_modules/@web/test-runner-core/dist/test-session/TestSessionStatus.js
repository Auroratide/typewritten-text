"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_STATUS = void 0;
exports.SESSION_STATUS = {
    // waiting for a browser to free up and run this test session
    SCHEDULED: 'SCHEDULED',
    // browser is booting up, waiting to ping back that it's starting
    INITIALIZING: 'INITIALIZING',
    // browser has started, running the actual tests
    TEST_STARTED: 'TEST_STARTED',
    // browser has collected the test results, but not yet results, logs or coverage
    TEST_FINISHED: 'TEST_FINISHED',
    // finished running tests and collecting tests results, logs, coverage etc.
    FINISHED: 'FINISHED',
};
//# sourceMappingURL=TestSessionStatus.js.map