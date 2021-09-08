"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferedLogger = void 0;
class BufferedLogger {
    constructor(parent) {
        this.parent = parent;
        this.buffer = [];
    }
    log(...messages) {
        this.buffer.push({ method: 'log', args: messages });
    }
    debug(...messages) {
        this.buffer.push({ method: 'debug', args: messages });
    }
    error(...messages) {
        this.buffer.push({ method: 'error', args: messages });
    }
    warn(...messages) {
        this.buffer.push({ method: 'warn', args: messages });
    }
    group() {
        this.buffer.push({ method: 'group' });
    }
    groupEnd() {
        this.buffer.push({ method: 'groupEnd' });
    }
    logSyntaxError(error) {
        this.buffer.push({ method: 'logSyntaxError', args: [error] });
    }
    logBufferedMessages() {
        for (const { method, args = [] } of this.buffer) {
            this.parent[method](...args);
        }
    }
}
exports.BufferedLogger = BufferedLogger;
//# sourceMappingURL=BufferedLogger.js.map