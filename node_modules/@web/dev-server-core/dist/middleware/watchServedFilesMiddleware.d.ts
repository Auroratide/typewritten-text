import { Middleware } from 'koa';
import { FSWatcher } from 'chokidar';
/**
 * Sets up a middleware which tracks served files and sends a reload message to any
 * active browsers when any of the files change.
 */
export declare function watchServedFilesMiddleware(fileWatcher: FSWatcher, rootDir: string): Middleware;
//# sourceMappingURL=watchServedFilesMiddleware.d.ts.map