export interface Node {
    value: number;
    left?: this;
    right?: this;
}

export function getLargest(bst: Node, count: number): number[] {
    const result: number[] = [];
    getLargestRec(bst, count, result);
    return result;
}

function getLargestRec(bst: Node | undefined, count: number, result: number[]): void {
    if (!bst) {
        return;
    }

    getLargestRec(bst.right, count, result);

    if (result.length < count) {
        result.push(bst.value);
        getLargestRec(bst.left, count, result);
    }
}
