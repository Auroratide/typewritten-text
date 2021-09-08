"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDevServer = void 0;
const dev_server_core_1 = require("@web/dev-server-core");
const mergeConfigs_1 = require("./config/mergeConfigs");
const parseConfig_1 = require("./config/parseConfig");
const readCliArgs_1 = require("./config/readCliArgs");
const readFileConfig_1 = require("./config/readFileConfig");
const DevServerStartError_1 = require("./DevServerStartError");
const createLogger_1 = require("./logger/createLogger");
const openBrowser_1 = require("./openBrowser");
/**
 * Starts the dev server.
 */
async function startDevServer(options = {}) {
    var _a;
    const { config: extraConfig, readCliArgs: readCliArgsFlag = true, readFileConfig: readFileConfigFlag = true, configName, autoExitProcess = true, logStartMessage = true, argv = process.argv, } = options;
    try {
        const cliArgs = readCliArgsFlag ? readCliArgs_1.readCliArgs({ argv }) : {};
        const rawConfig = readFileConfigFlag
            ? await readFileConfig_1.readFileConfig({ configName, configPath: cliArgs.config })
            : {};
        const mergedConfig = mergeConfigs_1.mergeConfigs(extraConfig, rawConfig);
        const config = await parseConfig_1.parseConfig(mergedConfig, cliArgs);
        const { logger, loggerPlugin } = createLogger_1.createLogger({
            debugLogging: !!config.debug,
            clearTerminalOnReload: !!config.watch && !!config.clearTerminalOnReload,
            logStartMessage: !!logStartMessage,
        });
        config.plugins = (_a = config.plugins) !== null && _a !== void 0 ? _a : [];
        config.plugins.unshift(loggerPlugin);
        const server = new dev_server_core_1.DevServer(config, logger);
        if (autoExitProcess) {
            process.on('uncaughtException', error => {
                /* eslint-disable-next-line no-console */
                console.error(error);
            });
            process.on('SIGINT', async () => {
                await server.stop();
                process.exit(0);
            });
        }
        await server.start();
        if (config.open != null && config.open !== false) {
            await openBrowser_1.openBrowser(config);
        }
        return server;
    }
    catch (error) {
        if (error instanceof DevServerStartError_1.DevServerStartError) {
            console.error(error.message);
        }
        else {
            console.error(error);
        }
        process.exit(1);
    }
}
exports.startDevServer = startDevServer;
//# sourceMappingURL=startDevServer.js.map