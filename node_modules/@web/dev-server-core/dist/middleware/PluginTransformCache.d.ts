import { FSWatcher } from 'chokidar';
interface CacheEntry {
    body: string;
    headers: Record<string, string>;
    filePath: string;
}
/**
 * Cache for file transformations.
 */
export declare class PluginTransformCache {
    private fileWatcher;
    private rootDir;
    private cacheKeysPerFilePath;
    private lruCache;
    constructor(fileWatcher: FSWatcher, rootDir: string);
    get(cacheKey: string): Promise<CacheEntry | undefined>;
    set(filePath: string, body: string, headers: Record<string, string>, cacheKey: string): Promise<void>;
}
export {};
//# sourceMappingURL=PluginTransformCache.d.ts.map