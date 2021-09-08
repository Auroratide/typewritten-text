/**
 * Creates a wrapper as a direct child of `<body>` to put the tested element into.
 * Need to be in the DOM to test for example `connectedCallback()` on elements.
 *
 * @param {Element} [parentNode]
 * @returns {Element} wrapping node
 */
export function fixtureWrapper(parentNode?: Element): Element;
/**
 * Cleans up all defined fixtures by removing the actual wrapper nodes.
 * Common usecase is at the end of each test.
 */
export function fixtureCleanup(): void;
/** @type Array<Node> */
export const cachedWrappers: Array<Node>;
//# sourceMappingURL=fixtureWrapper.d.ts.map