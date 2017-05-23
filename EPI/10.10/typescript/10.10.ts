export interface Node<T> {
    value: T;
    left?: Node<T>;
    right?: Node<T>;
}

export function reconstruct<T>(inOrder: T[], preOrder: T[]): Node<T> | undefined {
    return reconstructRec(inOrder, 0, preOrder, 0).root;
}

function reconstructRec<T>(inOrder: T[], i: number, preOrder: T[], p: number,
    nextInOrderAncestorValue?: T): {root?: Node<T>, size: number} {

    if (i >= inOrder.length || p >= preOrder.length) {
        return {size: 0};
    }

    const rootValue = preOrder[p];

    // Move past the root.
    p += 1;

    const left = inOrder[i] !== rootValue ?
        reconstructRec(inOrder, i, preOrder, p, rootValue) :
        {size: 0};

    // Move past the left subtree.
    i += left.size + 1;
    p += left.size;

    const right = i < inOrder.length && inOrder[i] !== nextInOrderAncestorValue ?
        reconstructRec(inOrder, i, preOrder, p, nextInOrderAncestorValue) :
        {size: 0};

    return {
        root: {value: rootValue, left: left.root, right: right.root},
        size: 1 + left.size + right.size
    };
}
