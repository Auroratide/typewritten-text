export function addToGlobalTagsCache(tag: string, klass: typeof HTMLElement): WeakMap<{
    new (): HTMLElement;
    prototype: HTMLElement;
}, string>;
export function getFromGlobalTagsCache(klass: typeof HTMLElement): undefined | string;
//# sourceMappingURL=globalTagsCache.d.ts.map