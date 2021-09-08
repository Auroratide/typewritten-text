"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseConfig = exports.validateConfig = void 0;
const portfinder_1 = require("portfinder");
const path_1 = __importDefault(require("path"));
const mergeConfigs_1 = require("./mergeConfigs");
const esbuildPlugin_1 = require("../plugins/esbuildPlugin");
const watchPlugin_1 = require("../plugins/watchPlugin");
const nodeResolvePlugin_1 = require("../plugins/nodeResolvePlugin");
const DevServerStartError_1 = require("../DevServerStartError");
const defaultConfig = {
    rootDir: process.cwd(),
    hostname: 'localhost',
    injectWebSocket: true,
    clearTerminalOnReload: true,
    middleware: [],
    plugins: [],
};
function validate(config, key, type) {
    if (config[key] == null) {
        return;
    }
    if (typeof config[key] !== type) {
        throw new DevServerStartError_1.DevServerStartError(`Configuration error: The ${key} setting should be a ${type}.`);
    }
}
const stringSettings = ['rootDir', 'hostname', 'basePath', 'appIndex', 'sslKey', 'sslCert'];
const numberSettings = ['port'];
const booleanSettings = ['watch', 'preserveSymlinks', 'http2', 'eventStream'];
function validateConfig(config) {
    stringSettings.forEach(key => validate(config, key, 'string'));
    numberSettings.forEach(key => validate(config, key, 'number'));
    booleanSettings.forEach(key => validate(config, key, 'boolean'));
    if (config.basePath != null && !config.basePath.startsWith('/')) {
        throw new Error(`basePath property must start with a /. Received: ${config.basePath}`);
    }
    if (config.esbuildTarget != null &&
        !(typeof config.esbuildTarget === 'string' || Array.isArray(config.esbuildTarget))) {
        throw new Error(`Configuration error: The esbuildTarget setting should be a string or array.`);
    }
    if (config.open != null &&
        !(typeof config.open === 'string' || typeof config.open === 'boolean')) {
        throw new Error(`Configuration error: The open setting should be a string or boolean.`);
    }
    return config;
}
exports.validateConfig = validateConfig;
async function parseConfig(config, cliArgs) {
    var _a;
    const mergedConfigs = mergeConfigs_1.mergeConfigs(defaultConfig, config, cliArgs);
    // backwards compatibility for configs written for es-dev-server, where middleware was
    // spelled incorrectly as middlewares
    if (Array.isArray(mergedConfigs.middlewares)) {
        mergedConfigs.middleware.push(...mergedConfigs.middlewares);
    }
    const finalConfig = validateConfig(mergedConfigs);
    // filter out non-objects from plugin list
    finalConfig.plugins = ((_a = finalConfig.plugins) !== null && _a !== void 0 ? _a : []).filter(pl => typeof pl === 'object');
    // ensure rootDir is always resolved
    if (typeof finalConfig.rootDir === 'string') {
        finalConfig.rootDir = path_1.default.resolve(finalConfig.rootDir);
    }
    // generate a default random port
    if (typeof finalConfig.port !== 'number') {
        finalConfig.port = await portfinder_1.getPortPromise({ port: 8000 });
    }
    if (finalConfig.nodeResolve) {
        const userOptions = typeof config.nodeResolve === 'object' ? config.nodeResolve : undefined;
        // do node resolve after user plugins, to allow user plugins to resolve imports
        finalConfig.plugins.push(nodeResolvePlugin_1.nodeResolvePlugin(finalConfig.rootDir, finalConfig.preserveSymlinks, userOptions));
    }
    // map flags to plugin
    if (finalConfig === null || finalConfig === void 0 ? void 0 : finalConfig.esbuildTarget) {
        finalConfig.plugins.unshift(esbuildPlugin_1.esbuildPlugin(finalConfig.esbuildTarget));
    }
    if (finalConfig.watch) {
        finalConfig.plugins.unshift(watchPlugin_1.watchPlugin());
    }
    return finalConfig;
}
exports.parseConfig = parseConfig;
//# sourceMappingURL=parseConfig.js.map