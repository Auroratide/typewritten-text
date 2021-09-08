"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginMimeTypeMiddleware = void 0;
/**
 * Sets up a middleware which allows plugins to resolve the mime type.
 */
function pluginMimeTypeMiddleware(logger, plugins) {
    const mimeTypePlugins = plugins.filter(p => 'resolveMimeType' in p);
    if (mimeTypePlugins.length === 0) {
        // nothing to transform
        return (ctx, next) => next();
    }
    return async (context, next) => {
        var _a;
        await next();
        if (context.status < 200 || context.status >= 300) {
            return undefined;
        }
        for (const plugin of mimeTypePlugins) {
            const result = await ((_a = plugin.resolveMimeType) === null || _a === void 0 ? void 0 : _a.call(plugin, context));
            const type = typeof result === 'object' ? result.type : result;
            if (type) {
                logger.debug(`Plugin ${plugin.name} resolved mime type of ${context.path} to ${type}`);
                context.type = type;
            }
        }
    };
}
exports.pluginMimeTypeMiddleware = pluginMimeTypeMiddleware;
//# sourceMappingURL=pluginMimeTypeMiddleware.js.map