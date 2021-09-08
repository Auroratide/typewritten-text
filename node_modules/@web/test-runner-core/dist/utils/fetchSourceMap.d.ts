import { SourceMapConverter } from 'convert-source-map';
interface FetchCodeArgs {
    protocol: string;
    host: string;
    port: number;
    browserUrl: string;
    userAgent?: string;
}
interface FetchCodeReturnValue {
    source?: string;
    sourceMap?: SourceMapConverter;
}
/**
 * Fetches the source maps for a file by retreiving the original source code from the server, and
 * reading the source maps if there are any available.
 */
export declare function fetchSourceMap(args: FetchCodeArgs): Promise<FetchCodeReturnValue>;
export {};
//# sourceMappingURL=fetchSourceMap.d.ts.map