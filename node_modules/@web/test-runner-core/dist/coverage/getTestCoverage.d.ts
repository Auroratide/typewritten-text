import { CoverageSummaryData, CoverageMap } from 'istanbul-lib-coverage';
import { TestSession } from '../test-session/TestSession';
import { CoverageConfig } from '../config/TestRunnerCoreConfig';
export declare const coverageTypes: (keyof CoverageSummaryData)[];
export interface TestCoverage {
    passed: boolean;
    coverageMap: CoverageMap;
    summary: CoverageSummaryData;
}
export declare function getTestCoverage(sessions: Iterable<TestSession>, config?: CoverageConfig): TestCoverage;
//# sourceMappingURL=getTestCoverage.d.ts.map