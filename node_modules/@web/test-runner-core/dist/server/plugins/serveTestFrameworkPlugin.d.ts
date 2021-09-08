import { Plugin } from '@web/dev-server-core';
import { TestFramework } from '../../test-framework/TestFramework';
/**
 * Serves test framework without requiring the files to be available within the root dir of the project.
 */
export declare function serveTestFrameworkPlugin(testFramework: TestFramework): {
    testFrameworkImport: string;
    testFrameworkPlugin: Plugin;
};
//# sourceMappingURL=serveTestFrameworkPlugin.d.ts.map