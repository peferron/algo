export interface Node {
    value: number;
    left?: this;
    right?: this;
}

export function createBalancedBST(value: number[]): Node | undefined {
    return createBalancedBSTRec(value, 0, value.length);
}

function createBalancedBSTRec(values: number[], start: number, end: number): Node | undefined {
    if (start >= end) {
        return undefined;
    }

    const rootIndex = start + Math.floor((end - start) / 2);

    return {
        value: values[rootIndex],
        left: createBalancedBSTRec(values, start, rootIndex),
        right: createBalancedBSTRec(values, rootIndex + 1, end)
    };
}
