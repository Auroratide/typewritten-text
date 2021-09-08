"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFilePath = void 0;
const path_1 = __importDefault(require("path"));
const REGEXP_TO_FILE_PATH = new RegExp('/', 'g');
function toFilePath(browserPath) {
    return browserPath.replace(REGEXP_TO_FILE_PATH, path_1.default.sep);
}
exports.toFilePath = toFilePath;
//# sourceMappingURL=utils.js.map