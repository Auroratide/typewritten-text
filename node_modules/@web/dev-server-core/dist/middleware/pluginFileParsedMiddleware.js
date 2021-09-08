"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginFileParsedMiddleware = void 0;
/**
 * Calls fileParsed hook on plugins.
 */
function pluginFileParsedMiddleware(plugins) {
    const fileParsedPlugins = plugins.filter(p => 'fileParsed' in p);
    if (fileParsedPlugins.length === 0) {
        // nothing to call
        return (ctx, next) => next();
    }
    return async (context, next) => {
        var _a;
        await next();
        if (context.status < 200 || context.status >= 300) {
            return undefined;
        }
        for (const plugin of fileParsedPlugins) {
            (_a = plugin.fileParsed) === null || _a === void 0 ? void 0 : _a.call(plugin, context);
        }
    };
}
exports.pluginFileParsedMiddleware = pluginFileParsedMiddleware;
//# sourceMappingURL=pluginFileParsedMiddleware.js.map