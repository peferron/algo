export interface Node<T> {
    value: T;
    left?: this;
    right?: this;
}

export function constructFromPreorder<T>(preorder: (T | undefined)[]): Node<T> | undefined {
    return rec(preorder, 0).root;
}

function rec<T>(preorder: (T | undefined)[], i: number): {root: Node<T> | undefined, length: number} {
    const rootValue = preorder[i];

    if (rootValue === undefined) {
        return {root: undefined, length: 1};
    }

    const left = rec(preorder, i + 1);
    const right = rec(preorder, i + 1 + left.length);

    return {
        root: {value: rootValue, left: left.root, right: right.root},
        length: 1 + left.length + right.length
    };
}
