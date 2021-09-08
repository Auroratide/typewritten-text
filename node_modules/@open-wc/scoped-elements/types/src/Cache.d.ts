/**
 * Cache class that allows to search in a cache hierarchy.
 * @template T, Q
 */
export class Cache<T, Q> {
    /**
     * Creates a Cache instance
     * @param {Cache} [parent]
     */
    constructor(parent?: Cache<any, any>);
    _parent: Cache<any, any>;
    _cache: Map<any, any>;
    /**
     * Returns a boolean indicating whether an element with the specified key exists or not.
     *
     * @param {T} key - The key of the element to test for presence in the Cache object.
     * @return {boolean}
     */
    has(key: T): boolean;
    /**
     * Adds or updates an element with a specified key and a value to a Cache object.
     *
     * @param {T} key - The key of the element to add to the Cache object.
     * @param {Q} value - The value of the element to add to the Cache object.
     * @return {Cache<T, Q>} the cache object
     */
    set(key: T, value: Q): Cache<T, Q>;
    /**
     * Returns a specified element from a Map object. If the value that is associated to the provided key is an
     * object, then you will get a reference to that object and any change made to that object will effectively modify
     * it inside the Map object.
     *
     * @param {T} key - The key of the element to return from the Cache object.
     * @return {Q}
     */
    get(key: T): Q;
}
//# sourceMappingURL=Cache.d.ts.map