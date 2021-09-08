import { Logger, ErrorWithLocation } from '../logger/Logger';
export declare class BufferedLogger implements Logger {
    private parent;
    buffer: {
        method: keyof Logger;
        args?: any[];
    }[];
    constructor(parent: Logger);
    log(...messages: unknown[]): void;
    debug(...messages: unknown[]): void;
    error(...messages: unknown[]): void;
    warn(...messages: unknown[]): void;
    group(): void;
    groupEnd(): void;
    logSyntaxError(error: ErrorWithLocation): void;
    logBufferedMessages(): void;
}
//# sourceMappingURL=BufferedLogger.d.ts.map