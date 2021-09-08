# Installation
> `npm install --save @types/babel__code-frame`

# Summary
This package contains type definitions for @babel/code-frame (https://github.com/babel/babel/tree/master/packages/babel-code-frame).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/babel__code-frame.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/babel__code-frame/index.d.ts)
````ts
// Type definitions for @babel/code-frame 7.0
// Project: https://github.com/babel/babel/tree/master/packages/babel-code-frame, https://babeljs.io
// Definitions by: Mohsen Azimi <https://github.com/mohsen1>
//                 Forbes Lindesay <https://github.com/ForbesLindesay>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export interface SourceLocation {
    start: { line: number; column?: number | undefined };
    end?: { line: number; column?: number | undefined } | undefined;
}
export function codeFrameColumns(
    rawLines: string,
    location: SourceLocation,
    options?: BabelCodeFrameOptions
): string;

export interface BabelCodeFrameOptions {
    /** Syntax highlight the code as JavaScript for terminals. default: false */
    highlightCode?: boolean | undefined;
    /**  The number of lines to show above the error. default: 2 */
    linesAbove?: number | undefined;
    /**  The number of lines to show below the error. default: 3 */
    linesBelow?: number | undefined;
    /**
     * Forcibly syntax highlight the code as JavaScript (for non-terminals);
     * overrides highlightCode.
     * default: false
     */
    forceColor?: boolean | undefined;
    /**
     * Pass in a string to be displayed inline (if possible) next to the
     * highlighted location in the code. If it can't be positioned inline,
     * it will be placed above the code frame.
     * default: nothing
     */
    message?: string | undefined;
}

/**
 * Generate errors that contain a code frame that point to source locations.
 *
 * @param rawLines Raw lines to frame
 * @param lineNumber Line number (1 indexed)
 * @param colNumber Column number
 * @param options Additional options
 *
 * @returns Framed code
 */
export default function codeFrame(
    rawLines: string,
    lineNumber: number,
    colNumber: number,
    options?: BabelCodeFrameOptions
): string;

````

### Additional Details
 * Last updated: Tue, 06 Jul 2021 18:05:40 GMT
 * Dependencies: none
 * Global values: none

# Credits
These definitions were written by [Mohsen Azimi](https://github.com/mohsen1), and [Forbes Lindesay](https://github.com/ForbesLindesay).
