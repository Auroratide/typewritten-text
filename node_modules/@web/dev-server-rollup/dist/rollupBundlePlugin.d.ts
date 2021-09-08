import { Plugin } from '@web/dev-server-core';
import { RollupOptions } from 'rollup';
export interface RollupPluginOptions {
    rollupConfig: RollupOptions;
}
export declare function rollupBundlePlugin(pluginOptions: RollupPluginOptions): Plugin;
//# sourceMappingURL=rollupBundlePlugin.d.ts.map