"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginSyntaxError = void 0;
class PluginSyntaxError extends Error {
    constructor(message, filePath, code, line, column) {
        super(message);
        this.message = message;
        this.filePath = filePath;
        this.code = code;
        this.line = line;
        this.column = column;
        this.name = 'PluginSyntaxError';
    }
}
exports.PluginSyntaxError = PluginSyntaxError;
//# sourceMappingURL=PluginSyntaxError.js.map