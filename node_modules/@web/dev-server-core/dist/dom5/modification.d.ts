declare function newTextNode(value: string): any;
declare function newCommentNode(comment: string): any;
declare function newElement(tagName: string, namespace?: string): any;
declare function newDocumentFragment(): any;
export declare function cloneNode(node: any): any;
export declare function replace(oldNode: any, newNode: any): void;
export declare function remove(node: any): void;
export declare function insertBefore(parent: any, target: any, newNode: any): void;
export declare function insertAfter(parent: any, target: any, newNode: any): void;
/**
 * Removes a node and places its children in its place.  If the node
 * has no parent, the operation is impossible and no action takes place.
 */
export declare function removeNodeSaveChildren(node: any): void;
/**
 * When parse5 parses an HTML document with `parse`, it injects missing root
 * elements (html, head and body) if they are missing.  This function removes
 * these from the AST if they have no location info, so it requires that
 * the `parse5.parse` be used with the `locationInfo` option of `true`.
 */
export declare function removeFakeRootElements(ast: Node): void;
export declare function append(parent: any, newNode: any): void;
export declare const constructors: {
    text: typeof newTextNode;
    comment: typeof newCommentNode;
    element: typeof newElement;
    fragment: typeof newDocumentFragment;
};
export {};
//# sourceMappingURL=modification.d.ts.map