"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const events_1 = require("events");
class EventEmitter {
    constructor() {
        this.__emitter = new events_1.EventEmitter();
    }
    on(eventName, fn) {
        this.__emitter.on(eventName, fn);
    }
    off(eventName, fn) {
        this.__emitter.off(eventName, fn);
    }
    emit(eventName, params) {
        this.__emitter.emit(eventName, params);
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map