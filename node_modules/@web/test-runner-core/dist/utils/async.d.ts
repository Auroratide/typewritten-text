/**
 * Wraps a Promise with a timeout, rejecing the promise with the timeout.
 */
export declare function withTimeout<T>(promise: Promise<T> | void, message: string, timeout: number): Promise<T>;
/**
 * Iterates iterable, executes each function in parallel and awaits
 * all function return values
 */
export declare function forEachAsync<T>(it: Iterable<T>, fn: (t: T) => void | Promise<void>): Promise<void>;
/**
 * Iterates iterable, executes each function in parallel and awaits
 * all function return values returning the awaited result
 */
export declare function mapAsync<T, R>(it: Iterable<T>, fn: (t: T) => R | Promise<R>): Promise<R[]>;
//# sourceMappingURL=async.d.ts.map