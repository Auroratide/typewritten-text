/**
 * Gets a scoped tag name from the cache or generates a new one and defines the element if needed
 *
 * @exports
 * @param {string} tagName
 * @param {typeof HTMLElement} klass
 * @param {import('./Cache.js').Cache<string, string>} tagsCache
 * @returns {string}
 */
export function registerElement(tagName: string, klass: typeof HTMLElement, tagsCache?: import('./Cache.js').Cache<string, string>): string;
/**
 * Defines a lazy element
 *
 * @param {string} tagName
 * @param {typeof HTMLElement} klass
 * @param {import('./Cache.js').Cache<string, string>} tagsCache
 */
export function defineScopedElement(tagName: string, klass: typeof HTMLElement, tagsCache: import('./Cache.js').Cache<string, string>): void;
//# sourceMappingURL=registerElement.d.ts.map