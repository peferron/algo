export interface Node {
    value: number;
    left?: Node;
    right?: Node;
}

export function isBST(root: Node): boolean {
    return isBSTRec(root, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
}

function isBSTRec(root: Node | undefined, min: number, max: number): boolean {
    if (!root) {
        return true;
    }

    const {value, left, right} = root;

    if (!(min <= value && value <= max)) {
        return false;
    }

    return isBSTRec(left, min, Math.min(max, value)) &&
        isBSTRec(right, Math.max(min, value), max);
}
