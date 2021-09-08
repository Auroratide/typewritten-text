import { Middleware } from 'koa';
import { Logger } from '../logger/Logger';
import { Plugin } from '../plugins/Plugin';
/**
 * Sets up a middleware which allows plugins to resolve the mime type.
 */
export declare function pluginMimeTypeMiddleware(logger: Logger, plugins: Plugin[]): Middleware;
//# sourceMappingURL=pluginMimeTypeMiddleware.d.ts.map