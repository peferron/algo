export interface Node {
    parent?: Node;
}

export function LCA(a: Node, b: Node): Node | undefined {
    const ad = depth(a);
    const bd = depth(b);

    let [low, high] = ad > bd ? [a, b] : [b, a];

    for (let d = Math.abs(ad - bd); d > 0; d -= 1) {
        low = low.parent!;
    }

    while (low !== high) {
        if (!low.parent || !high.parent) {
            return undefined;
        }

        low = low.parent;
        high = high.parent;
    }

    return low;
}

function depth(node: Node): number {
    let d = 0;

    while (node.parent) {
        node = node.parent;
        d += 1;
    }

    return d;
}
