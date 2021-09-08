"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basePathMiddleware = void 0;
/**
 * Creates middleware which strips a base path from each request
 */
function basePathMiddleware(basePath) {
    const pathToStrip = basePath.endsWith('/')
        ? basePath.substring(0, basePath.length - 1)
        : basePath;
    return (ctx, next) => {
        if (ctx.url.startsWith(pathToStrip)) {
            ctx.url = ctx.url.replace(pathToStrip, '');
        }
        return next();
    };
}
exports.basePathMiddleware = basePathMiddleware;
//# sourceMappingURL=basePathMiddleware.js.map