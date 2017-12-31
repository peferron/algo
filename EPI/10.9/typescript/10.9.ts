export interface Node {
    parent?: this;
    left?: this;
    right?: this;
}

export function traverseInOrder<T extends Node>(root: T, callback: (node: T) => void): void {
    let current: T | undefined = root;
    let prev: T | undefined;

    while (current) {
        const curr = current;

        if (prev && prev === current.left) {
            // Coming back up from the left child.
            callback(current);
            current = current.right || current.parent;
        } else if (prev && prev === current.right) {
            // Coming back up from the right child.
            current = current.parent;
        } else  {
            // Coming down from the parent.
            if (current.left) {
                current = current.left;
            } else {
                callback(current);
                current = current.right || current.parent;
            }
        }

        prev = curr;
    }

    /* Alternative implementation: instead of enumerating the possibilites for the previous node,
       we enumerate the possibilities for the next node. It's correct, but more convoluted.

    while (true) {
        const curr = current;

        // Should we move down to the left child?
        if (current.left && (!prev || prev === current.parent)) {
            current = current.left;
        // Should we move down to the right child?
        } else if (current.right && prev !== current.right) {
            callback(current);
            current = current.right;
        // Move up to the parent.
        } else {
            // If the previous node was the right child, then the current node has already been
            // passed to the callback.
            if (!prev || prev !== current.right) {
                callback(current);
            }
            if (current.parent) {
                current = current.parent;
            } else {
                break;
            }
        }

        prev = curr;
    }

    */
}
