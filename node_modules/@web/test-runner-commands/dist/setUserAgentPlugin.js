"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserAgentPlugin = void 0;
function setUserAgentPlugin() {
    return {
        name: 'set-user-agent-command',
        async executeCommand({ command, payload, session }) {
            if (command === 'set-user-agent') {
                if (typeof payload !== 'string') {
                    throw new Error('You must provide a user agent as a string');
                }
                if (session.browser.type === 'puppeteer') {
                    const page = session.browser.getPage(session.id);
                    await page.setUserAgent(payload);
                    return true;
                }
                throw new Error('set user agent is only supported on puppeteer.');
            }
        },
    };
}
exports.setUserAgentPlugin = setUserAgentPlugin;
//# sourceMappingURL=setUserAgentPlugin.js.map