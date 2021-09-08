"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = void 0;
const DevServerLogger_1 = require("./DevServerLogger");
const logStartMessage_1 = require("./logStartMessage");
const CLEAR_COMMAND = process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[H';
function createLogger(args) {
    let onSyntaxError;
    const logger = new DevServerLogger_1.DevServerLogger(args.debugLogging, msg => onSyntaxError === null || onSyntaxError === void 0 ? void 0 : onSyntaxError(msg));
    return {
        logger,
        loggerPlugin: {
            name: 'logger',
            serverStart({ config, logger, fileWatcher, webSockets }) {
                if (webSockets) {
                    onSyntaxError = function onSyntaxError(msg) {
                        webSockets.sendConsoleLog(msg);
                    };
                }
                function logStartup(skipClear = false) {
                    if (!skipClear && args.clearTerminalOnReload) {
                        process.stdout.write(CLEAR_COMMAND);
                    }
                    logStartMessage_1.logStartMessage(config, logger);
                }
                if (args.logStartMessage) {
                    logStartup(true);
                }
                if (args.clearTerminalOnReload) {
                    fileWatcher.addListener('change', () => logStartup());
                    fileWatcher.addListener('unlink', () => logStartup());
                }
            },
        },
    };
}
exports.createLogger = createLogger;
//# sourceMappingURL=createLogger.js.map