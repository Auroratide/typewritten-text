"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findExecutablePath = void 0;
const chrome_launcher_1 = require("chrome-launcher");
function findExecutablePath() {
    const path = chrome_launcher_1.Launcher.getFirstInstallation();
    if (!path) {
        throw new Error('Could not automatically find any installation of Chrome using chrome-launcher. ' +
            'Set the CHROME_PATH to help chrome-launcher find it, or use ' +
            '@web/test-runner-puppeteer or @web/test-runner-playwright for a bundled browser.');
    }
    return path;
}
exports.findExecutablePath = findExecutablePath;
//# sourceMappingURL=findExecutablePath.js.map