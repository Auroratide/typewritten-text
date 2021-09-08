"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setViewportPlugin = void 0;
function isObject(payload) {
    return payload != null && typeof payload === 'object';
}
function isViewportObject(payload) {
    if (!isObject(payload))
        throw new Error('You must provide a viewport object');
    if (payload.height == null)
        throw new Error('You must provide a viewport width');
    if (payload.width == null)
        throw new Error('You must provide a viewport width');
    if (typeof payload.height !== 'number')
        throw new Error('Viewport height must be a number');
    if (typeof payload.height !== 'number')
        throw new Error('Viewport width must be a number');
    if (payload.isMobile != null)
        throw new Error('isMobile cannot be used because it triggers a page reload');
    if (payload.hasTouch != null)
        throw new Error('hasTouch cannot be used because it triggers a page reload');
    return true;
}
function setViewportPlugin() {
    return {
        name: 'set-viewport-command',
        async executeCommand({ command, payload, session }) {
            if (command === 'set-viewport') {
                if (!isViewportObject(payload)) {
                    throw new Error('You must provide a viewport object');
                }
                if (session.browser.type === 'puppeteer') {
                    const page = session.browser.getPage(session.id);
                    await page.setViewport(payload);
                    return true;
                }
                if (session.browser.type === 'playwright') {
                    const page = session.browser.getPage(session.id);
                    await page.setViewportSize(payload);
                    return true;
                }
                throw new Error(`Setting viewport is not supported for browser type ${session.browser.type}.`);
            }
        },
    };
}
exports.setViewportPlugin = setViewportPlugin;
//# sourceMappingURL=setViewportPlugin.js.map