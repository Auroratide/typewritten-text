import { DevServerCliArgs } from './readCliArgs';
import { DevServerConfig } from './DevServerConfig';
export declare function validateConfig(config: Partial<DevServerConfig>): DevServerConfig;
export declare function parseConfig(config: Partial<DevServerConfig>, cliArgs?: DevServerCliArgs): Promise<DevServerConfig>;
//# sourceMappingURL=parseConfig.d.ts.map