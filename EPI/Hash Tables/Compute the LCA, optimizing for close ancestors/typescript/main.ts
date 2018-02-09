export interface Node {
    parent?: Node;
}

export function LCA(a: Node, b: Node): Node | undefined {
    const visited = new Set<Node>();
    let aAncestor: Node | undefined = a;
    let bAncestor: Node | undefined = b;

    while (aAncestor || bAncestor) {
        if (aAncestor) {
            if (visited.has(aAncestor)) {
                return aAncestor;
            }
            visited.add(aAncestor);
            aAncestor = aAncestor.parent;
        }

        if (bAncestor) {
            if (visited.has(bAncestor)) {
                return bAncestor;
            }
            visited.add(bAncestor);
            bAncestor = bAncestor.parent;
        }
    }

    return undefined;
}
