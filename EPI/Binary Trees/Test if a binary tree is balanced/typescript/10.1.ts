export interface Node {
    left?: Node;
    right?: Node;
}

export function isBalanced(root: Node): boolean {
    return isBalancedRec(root).balanced;
}

function isBalancedRec(root: Node | undefined): {balanced: boolean, height: number} {
    if (!root) {
        return {balanced: true, height: 0};
    }

    const {balanced: lb, height: lh} = isBalancedRec(root.left);
    const {balanced: rb, height: rh} = isBalancedRec(root.right);

    return {
        balanced: lb && rb && Math.abs(lh - rh) <= 1,
        height: Math.max(lh, rh) + 1
    };
}
