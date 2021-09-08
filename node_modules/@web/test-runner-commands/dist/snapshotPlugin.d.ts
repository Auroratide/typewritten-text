import { TestRunnerPlugin } from '@web/test-runner-core';
export interface SaveSnapshotPayload {
    name: string;
    content: string;
}
export interface SnapshotPluginConfig {
    updateSnapshots?: boolean;
}
export declare function snapshotPlugin(config?: SnapshotPluginConfig): TestRunnerPlugin;
//# sourceMappingURL=snapshotPlugin.d.ts.map