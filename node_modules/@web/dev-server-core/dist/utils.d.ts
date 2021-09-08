/// <reference types="node" />
import { Context } from 'koa';
/**
 * Turns a file path into a path suitable for browsers, with a / as seperator.
 * @param {string} filePath
 * @returns {string}
 */
export declare function toBrowserPath(filePath: string): string;
/**
 * Transforms a file system path to a browser URL. For example windows uses `\` on the file system,
 * but it should use `/` in the browser.
 */
export declare function toFilePath(browserPath: string): string;
export declare function getHtmlPath(path: string): string;
export declare class RequestCancelledError extends Error {
}
/**
 * Returns the context body as string or buffer, depending on the content type.
 * Response streams can only be read once, the response body is replaced with
 * the stream result.
 */
export declare function getResponseBody(ctx: Context): Promise<string | Buffer>;
export declare function isInlineScriptRequest(contextOrUrl: Context | string): boolean;
export declare function getRequestBrowserPath(url: string): string;
export declare function getRequestFilePath(contextOrString: Context | string, rootDir: string): string;
export declare function isOutsideRootDir(browserPath: string): boolean;
export declare function resolvePathOutsideRootDir(browserPath: string, rootDir: string): {
    normalizedPath: string;
    newRootDir: string;
};
//# sourceMappingURL=utils.d.ts.map