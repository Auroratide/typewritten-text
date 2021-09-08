"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferedConsole = void 0;
const stream_1 = require("stream");
const console_1 = require("console");
/**
 * Buffers console messages so that they can be flushed all at once.
 */
class BufferedConsole {
    constructor() {
        this.buffer = [];
        this.outStream = new stream_1.Writable({
            write: (chunk, encoding, callback) => {
                callback();
                this.buffer.push(chunk);
            },
        });
        this.console = new console_1.Console({ colorMode: true, stdout: this.outStream });
    }
    flush() {
        // flush all pending console output
        for (const chunk of this.buffer) {
            process.stdout.write(chunk);
        }
        this.buffer = [];
    }
}
exports.BufferedConsole = BufferedConsole;
//# sourceMappingURL=BufferedConsole.js.map