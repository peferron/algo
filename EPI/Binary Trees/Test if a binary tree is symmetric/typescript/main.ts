export interface Node<T> {
    value: T;
    left?: Node<T>;
    right?: Node<T>;
}

export function isSymmetric<T>(tree: Node<T>): boolean {
    return areMirrorImages(tree.left, tree.right);
}

function areMirrorImages<T>(a: Node<T> | undefined, b: Node<T> | undefined): boolean {
    if (!a && !b) {
        return true;
    }

    if (!a || !b) {
        return false;
    }

    return a.value === b.value &&
        areMirrorImages(a.left, b.right) &&
        areMirrorImages(a.right, b.left);
}
