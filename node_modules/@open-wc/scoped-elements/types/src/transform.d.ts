/**
 * Obtains the cached strings array with resolved scoped elements or creates it
 *
 * @exports
 * @param {TemplateStringsArray} strings
 * @param {ScopedElementsMap} scopedElements
 * @param {import('./Cache.js').Cache<TemplateStringsArray, TemplateStringsArray>} templateCache
 * @param {import('./Cache.js').Cache<string, string>} tagsCache
 * @returns {TemplateStringsArray}
 */
export function transform(strings: TemplateStringsArray, scopedElements: ScopedElementsMap, templateCache: import('./Cache.js').Cache<TemplateStringsArray, TemplateStringsArray>, tagsCache: import('./Cache.js').Cache<string, string>): TemplateStringsArray;
export type ScopedElementsMap = {
    [key: string]: {
        new (): HTMLElement;
        prototype: HTMLElement;
    };
};
//# sourceMappingURL=transform.d.ts.map