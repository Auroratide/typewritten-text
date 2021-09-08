"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emulateMediaPlugin = void 0;
function isObject(payload) {
    return payload != null && typeof payload === 'object';
}
function isMediaObject(payload) {
    if (!isObject(payload))
        throw new Error('You must provide a viewport object');
    if (payload.media != null && !(typeof payload.media === 'string')) {
        throw new Error('media should be a string.');
    }
    if (payload.colorScheme != null && !(typeof payload.colorScheme === 'string')) {
        throw new Error('colorScheme should be a string.');
    }
    if (payload.reducedMotion != null && !(typeof payload.reducedMotion === 'string')) {
        throw new Error('reducedMotion should be a string.');
    }
    return true;
}
function emulateMediaPlugin() {
    return {
        name: 'emulate-media-command',
        async executeCommand({ command, payload, session }) {
            if (command === 'emulate-media') {
                if (!isMediaObject(payload)) {
                    throw new Error('You must provide a viewport object');
                }
                if (session.browser.type === 'puppeteer') {
                    const page = session.browser.getPage(session.id);
                    const features = [];
                    if (payload.colorScheme != null) {
                        features.push({ name: 'prefers-color-scheme', value: payload.colorScheme });
                    }
                    if (payload.reducedMotion != null) {
                        features.push({ name: 'prefers-reduced-motion', value: payload.reducedMotion });
                    }
                    await page.emulateMediaFeatures(features);
                    if (payload.media) {
                        await page.emulateMediaType(payload.media);
                    }
                    return true;
                }
                if (session.browser.type === 'playwright') {
                    const page = session.browser.getPage(session.id);
                    await page.emulateMedia(payload);
                    return true;
                }
                throw new Error(`Setting viewport is not supported for browser type ${session.browser.type}.`);
            }
        },
    };
}
exports.emulateMediaPlugin = emulateMediaPlugin;
//# sourceMappingURL=emulateMediaPlugin.js.map