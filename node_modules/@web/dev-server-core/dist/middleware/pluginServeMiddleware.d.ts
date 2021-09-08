import { Middleware } from 'koa';
import { Logger } from '../logger/Logger';
import { Plugin } from '../plugins/Plugin';
/**
 * Sets up a middleware which allows plugins to serve files instead of looking it up in the file system.
 */
export declare function pluginServeMiddleware(logger: Logger, plugins: Plugin[]): Middleware;
//# sourceMappingURL=pluginServeMiddleware.d.ts.map