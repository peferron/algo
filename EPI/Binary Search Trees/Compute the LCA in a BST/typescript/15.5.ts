export interface Node {
    value: number;
    left?: this;
    right?: this;
}

export function lca(root: Node, a: Node, b: Node): Node {
    let current = root;

    while (true) {
        if (a.value < current.value && b.value < current.value) {
            current = current.left!;
        } else if (a.value > current.value && b.value > current.value) {
            current = current.right!;
        } else {
            return current;
        }
    }
}
