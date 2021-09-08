import { Plugin as WdsPlugin } from '@web/dev-server-core';
import { Plugin as RollupPlugin } from 'rollup';
import { InputOptions } from 'rollup';
export interface RollupAdapterOptions {
    throwOnUnresolvedImport?: boolean;
}
export declare function rollupAdapter(rollupPlugin: RollupPlugin, rollupInputOptions?: Partial<InputOptions>, adapterOptions?: RollupAdapterOptions): WdsPlugin;
//# sourceMappingURL=rollupAdapter.d.ts.map