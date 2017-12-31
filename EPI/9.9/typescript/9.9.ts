export interface Node {
    left?: Node;
    right?: Node;
}

export function getNodesByDepth(root: Node): Node[][] {
    const result: Node[][] = [];
    fillDepths(root, 0, result);
    return result;
}

function fillDepths(root: Node | undefined, depth: number, result: Node[][]): void {
    if (!root) {
        return;
    }

    if (result.length <= depth) {
        result.push([]);
    }

    result[depth].push(root);
    fillDepths(root.left, depth + 1, result);
    fillDepths(root.right, depth + 1, result);
}
