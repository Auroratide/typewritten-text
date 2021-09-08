export interface StackFrame {
    line: number;
    column: number;
    name: string;
    fileName: string;
    type: FrameType;
    raw: string;
    sourceLine: number;
    sourceColumn: number;
    sourceFileName: string;
}
export declare type FrameType = "native" | "";
export declare function parseStackTrace(stack: string | undefined): StackFrame[];
