export interface Node<T> {
    value: T;
    left?: this;
    right?: this;
}

export function reconstruct<T>(inOrder: T[], preOrder: T[]): Node<T> | undefined {
    return rec(inOrder, 0, undefined, preOrder, 0).root;
}

function rec<T>(inOrder: T[], inOrderStart: number, inOrderExcludedValue: T | undefined,
    preOrder: T[], preOrderStart: number): {size: number, root?: Node<T>} {

    if (inOrder[inOrderStart] === inOrderExcludedValue) {
        return {size: 0};
    }

    const rootValue = preOrder[preOrderStart];
    const left = rec(inOrder, inOrderStart, rootValue, preOrder, preOrderStart + 1);
    const right = rec(inOrder, inOrderStart + 1 + left.size, inOrderExcludedValue,
        preOrder, preOrderStart + 1 + left.size);

    return {
        size: 1 + left.size + right.size,
        root: {value: rootValue, left: left.root, right: right.root}
    };
}
