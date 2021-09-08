"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMiddleware = void 0;
const path_1 = __importDefault(require("path"));
function cacheMiddleware(cachedPatterns, watch) {
    return async (context, next) => {
        await next();
        if (path_1.default.extname(context.path) &&
            (!watch || cachedPatterns.some(pattern => context.path.includes(pattern)))) {
            context.response.set('cache-control', 'public, max-age=31536000');
        }
    };
}
exports.cacheMiddleware = cacheMiddleware;
//# sourceMappingURL=cacheMiddleware.js.map