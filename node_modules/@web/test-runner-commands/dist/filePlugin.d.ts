/// <reference types="node" />
import { TestRunnerPlugin } from '@web/test-runner-core';
export interface WriteFilePayload {
    path: string;
    content: string;
    encoding?: BufferEncoding;
}
export interface ReadFilePayload {
    path: string;
    encoding?: BufferEncoding;
}
export interface RemoveFilePayload {
    path: string;
}
export declare function filePlugin(): TestRunnerPlugin;
//# sourceMappingURL=filePlugin.d.ts.map