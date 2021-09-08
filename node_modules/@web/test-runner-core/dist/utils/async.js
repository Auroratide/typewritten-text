"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAsync = exports.forEachAsync = exports.withTimeout = void 0;
/**
 * Wraps a Promise with a timeout, rejecing the promise with the timeout.
 */
function withTimeout(promise, message, timeout) {
    return new Promise((resolve, reject) => {
        if (!(promise instanceof Promise)) {
            resolve();
            return;
        }
        const timeoutId = setTimeout(() => {
            reject(new Error(message));
        }, timeout);
        promise
            .then(val => {
            resolve(val);
        })
            .catch(err => {
            reject(err);
        })
            .finally(() => {
            clearTimeout(timeoutId);
        });
    });
}
exports.withTimeout = withTimeout;
/**
 * Iterates iterable, executes each function in parallel and awaits
 * all function return values
 */
async function forEachAsync(it, fn) {
    const result = [];
    for (const e of it) {
        result.push(fn(e));
    }
    await Promise.all(result);
}
exports.forEachAsync = forEachAsync;
/**
 * Iterates iterable, executes each function in parallel and awaits
 * all function return values returning the awaited result
 */
function mapAsync(it, fn) {
    const result = [];
    for (const e of it) {
        result.push(fn(e));
    }
    return Promise.all(result);
}
exports.mapAsync = mapAsync;
//# sourceMappingURL=async.js.map