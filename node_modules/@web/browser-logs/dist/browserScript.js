"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.browserScript = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const REGEXP_SOURCE_MAP = /\/\/# sourceMappingURL=.*/;
const serializeScript = fs_1.default
    .readFileSync(path_1.default.resolve(__dirname, 'serialize.js'), 'utf-8')
    .replace(REGEXP_SOURCE_MAP, '');
const logUncaughtErrorsScript = fs_1.default
    .readFileSync(path_1.default.resolve(__dirname, 'logUncaughtErrors.js'), 'utf-8')
    .replace(REGEXP_SOURCE_MAP, '');
/**
 * Create the browser script. This project is compiled as CJS because it also needs to run in node, so
 * we create a small wrapper.
 *
 * It can't be ESM anyway, because it should work on older browsers as well.
 */
exports.browserScript = '(function () { var module={};var exports={};\n' +
    `${serializeScript}\n${logUncaughtErrorsScript}\n` +
    '\nwindow.__wtr_browser_logs__ = { serialize }; })();';
//# sourceMappingURL=browserScript.js.map