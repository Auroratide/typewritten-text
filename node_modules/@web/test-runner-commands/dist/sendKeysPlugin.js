"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendKeysPlugin = void 0;
function isObject(payload) {
    return payload != null && typeof payload === 'object';
}
function isSendKeysPayload(payload) {
    const validOptions = ['type', 'press', 'down', 'up'];
    if (!isObject(payload))
        throw new Error('You must provide a `SendKeysPayload` object');
    const numberOfValidOptions = Object.keys(payload).filter(key => validOptions.includes(key)).length;
    const unknownOptions = Object.keys(payload).filter(key => !validOptions.includes(key));
    if (numberOfValidOptions > 1)
        throw new Error(`You must provide ONLY one of the following properties to pass to the browser runner: ${validOptions.join(', ')}.`);
    if (numberOfValidOptions === 0)
        throw new Error(`You must provide one of the following properties to pass to the browser runner: ${validOptions.join(', ')}.`);
    if (unknownOptions.length > 0) {
        throw new Error('Unknown options `' + unknownOptions.join(', ') + '` present.');
    }
    return true;
}
function isTypePayload(payload) {
    return 'type' in payload;
}
function isPressPayload(payload) {
    return 'press' in payload;
}
function isDownPayload(payload) {
    return 'down' in payload;
}
function isUpPayload(payload) {
    return 'up' in payload;
}
function sendKeysPlugin() {
    return {
        name: 'send-keys-command',
        async executeCommand({ command, payload, session }) {
            if (command === 'send-keys') {
                if (!isSendKeysPayload(payload) || !payload) {
                    throw new Error('You must provide a `SendKeysPayload` object');
                }
                // handle specific behavior for playwright
                if (session.browser.type === 'playwright') {
                    const page = session.browser.getPage(session.id);
                    if (isTypePayload(payload)) {
                        await page.keyboard.type(payload.type);
                        return true;
                    }
                    else if (isPressPayload(payload)) {
                        await page.keyboard.press(payload.press);
                        return true;
                    }
                    else if (isDownPayload(payload)) {
                        await page.keyboard.down(payload.down);
                        return true;
                    }
                    else if (isUpPayload(payload)) {
                        await page.keyboard.up(payload.up);
                        return true;
                    }
                }
                // handle specific behavior for puppeteer
                if (session.browser.type === 'puppeteer') {
                    const page = session.browser.getPage(session.id);
                    if (isTypePayload(payload)) {
                        await page.keyboard.type(payload.type);
                        return true;
                    }
                    else if (isPressPayload(payload)) {
                        await page.keyboard.press(payload.press);
                        return true;
                    }
                    else if (isDownPayload(payload)) {
                        await page.keyboard.down(payload.down);
                        return true;
                    }
                    else if (isUpPayload(payload)) {
                        await page.keyboard.up(payload.up);
                        return true;
                    }
                }
                // handle specific behavior for webdriver
                if (session.browser.type === 'webdriver') {
                    const browser = session.browser;
                    if (isTypePayload(payload)) {
                        await browser.sendKeys(session.id, payload.type.split(''));
                        return true;
                    }
                    else if (isPressPayload(payload)) {
                        await browser.sendKeys(session.id, [payload.press]);
                        return true;
                    }
                    else {
                        throw new Error('Only "press" and "type" are supported by webdriver.');
                    }
                }
                // you might not be able to support all browser launchers
                throw new Error(`Sending keys is not supported for browser type ${session.browser.type}.`);
            }
        },
    };
}
exports.sendKeysPlugin = sendKeysPlugin;
//# sourceMappingURL=sendKeysPlugin.js.map