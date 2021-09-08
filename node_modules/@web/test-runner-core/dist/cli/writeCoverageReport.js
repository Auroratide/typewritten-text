"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCoverageReport = void 0;
const istanbul_reports_1 = __importDefault(require("istanbul-reports"));
const istanbul_lib_report_1 = __importDefault(require("istanbul-lib-report"));
function writeCoverageReport(testCoverage, config) {
    // create a context for report generation
    const context = istanbul_lib_report_1.default.createContext({
        dir: config.reportDir,
        watermarks: {
            statements: [50, 80],
            functions: [50, 80],
            branches: [50, 80],
            lines: [50, 80],
        },
        coverageMap: testCoverage.coverageMap,
    });
    const reporters = config.reporters || [];
    for (const reporter of reporters) {
        const report = istanbul_reports_1.default.create(reporter, {
            projectRoot: process.cwd(),
            maxCols: process.stdout.columns || 100,
        });
        report.execute(context);
    }
}
exports.writeCoverageReport = writeCoverageReport;
//# sourceMappingURL=writeCoverageReport.js.map