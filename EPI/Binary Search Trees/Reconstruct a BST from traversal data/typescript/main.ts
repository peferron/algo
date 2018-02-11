export interface Node {
    value: number;
    left?: Node;
    right?: Node;
}

export function reconstructFromPreOrder(traversal: number[]): Node {
    return rec(traversal, 0, Infinity).root!;
}

function rec(traversal: number[], start: number, max: number): {root?: Node, size: number} {
    if (start >= traversal.length || traversal[start] > max) {
        return {size: 0};
    }

    const rootValue = traversal[start];
    const left = rec(traversal, start + 1, rootValue);
    const right = rec(traversal, start + 1 + left.size, max);

    return {
        root: {value: rootValue, left: left.root, right: right.root},
        size: 1 + left.size + right.size
    };
}
