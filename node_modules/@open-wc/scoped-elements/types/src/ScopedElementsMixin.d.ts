export type ScopedElementsMixin = typeof import("./types.js").ScopedElementsMixinImplementation;
export const ScopedElementsMixin: typeof import("./types.js").ScopedElementsMixinImplementation;
export type ScopedElementsMap = {
    [key: string]: {
        new (): HTMLElement;
        prototype: HTMLElement;
    };
};
export type LitElement = import("lit-element").LitElement;
export type ShadyRenderOptions = import("lit-html/lib/shady-render").ShadyRenderOptions;
export type RenderFunction = (arg0: TemplateResult, arg1: Element | DocumentFragment | ShadowRoot, arg2: ShadyRenderOptions) => void;
import { TemplateResult } from "lit-html";
//# sourceMappingURL=ScopedElementsMixin.d.ts.map