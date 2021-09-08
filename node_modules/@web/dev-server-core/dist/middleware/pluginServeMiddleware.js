"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginServeMiddleware = void 0;
const path_1 = __importDefault(require("path"));
/**
 * Sets up a middleware which allows plugins to serve files instead of looking it up in the file system.
 */
function pluginServeMiddleware(logger, plugins) {
    const servePlugins = plugins.filter(p => 'serve' in p);
    if (servePlugins.length === 0) {
        // nothing to serve
        return (ctx, next) => next();
    }
    return async (context, next) => {
        var _a;
        for (const plugin of servePlugins) {
            const response = await ((_a = plugin.serve) === null || _a === void 0 ? void 0 : _a.call(plugin, context));
            if (typeof response === 'object') {
                if (response.body == null) {
                    throw new Error('A serve result must contain a body. Use the transform hook to change only the mime type.');
                }
                context.body = response.body;
                if (response.type != null) {
                    context.type = response.type;
                }
                else {
                    context.type = path_1.default.extname(path_1.default.basename(context.path));
                }
                if (response.headers) {
                    for (const [k, v] of Object.entries(response.headers)) {
                        context.response.set(k, v);
                    }
                }
                logger.debug(`Plugin ${plugin.name} served ${context.path}.`);
                context.status = 200;
                return;
            }
            else if (typeof response === 'string') {
                context.body = response;
                context.type = path_1.default.extname(path_1.default.basename(context.path));
                logger.debug(`Plugin ${plugin.name} served ${context.path}.`);
                context.status = 200;
                return;
            }
        }
        return next();
    };
}
exports.pluginServeMiddleware = pluginServeMiddleware;
//# sourceMappingURL=pluginServeMiddleware.js.map