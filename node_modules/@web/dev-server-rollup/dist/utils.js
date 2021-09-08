"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOutsideRootDir = exports.isAbsoluteFilePath = exports.toBrowserPath = void 0;
const path_1 = __importDefault(require("path"));
const REGEXP_ABSOLUTE = /^(?:\/|(?:[A-Za-z]:)?[\\|/])/;
/**
 * Turns a file path into a path suitable for browsers, with a / as seperator.
 * @param {string} filePath
 * @returns {string}
 */
function toBrowserPath(filePath) {
    return filePath.split(path_1.default.sep).join('/');
}
exports.toBrowserPath = toBrowserPath;
function isAbsoluteFilePath(path) {
    return REGEXP_ABSOLUTE.test(path);
}
exports.isAbsoluteFilePath = isAbsoluteFilePath;
function isOutsideRootDir(path) {
    return path.startsWith('/__wds-outside-root__/');
}
exports.isOutsideRootDir = isOutsideRootDir;
//# sourceMappingURL=utils.js.map