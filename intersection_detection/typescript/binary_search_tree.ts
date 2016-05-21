interface Node<T> {
    element: T;
    left?: Node<T>;
    right?: Node<T>;
}

export default class BinarySearchTree<T> {
    private root: Node<T>;

    constructor(private compare: (a: T, b: T) => number) {
    }

    insert(element: T): void {
        this.root = this.insertAt(this.root, element);
    }

    private insertAt(root: Node<T>, element: T): Node<T> {
        if (!root) {
            return {element};
        }

        if (this.compare(element, root.element) < 0) {
            root.left = this.insertAt(root.left, element);
        } else {
            root.right = this.insertAt(root.right, element);
        }
        return root;
    }

    swap(a: T, b: T): void {
        const nodeA = this.findAt(this.root, a);
        const nodeB = this.findAt(this.root, b);
        nodeA.element = b;
        nodeB.element = a;
    }

    private findAt(root: Node<T>, element: T): Node<T> {
        if (!root) {
            return undefined;
        }

        if (root.element === element) {
            return root;
        }

        const comparison = this.compare(element, root.element);
        return comparison <= 0 && this.findAt(root.left, element) ||
            comparison >= 0 && this.findAt(root.right, element);
    }

    remove(element: T): void {
        this.root = this.removeAt(this.root, element);
    }

    private removeAt(root: Node<T>, element: T): Node<T> {
        if (!root) {
            return undefined;
        }

        if (root.element === element) {
            if (root.left && root.right) {
                // Swap root with its predecessor. (We could also swap root with its successor.)
                root.element = this.maxAt(root.left).element;
                root.left = this.removeAt(root.left, root.element);
                return root;
            }
            return root.left || root.right;
        }

        const comparison = this.compare(element, root.element);
        if (comparison <= 0) {
            root.left = this.removeAt(root.left, element);
        }
        if (comparison >= 0) {
            root.right = this.removeAt(root.right, element);
        }
        return root;
    }

    private maxAt(root: Node<T>): Node<T> {
        return root && this.maxAt(root.left) || root;
    }

    private minAt(root: Node<T>): Node<T> {
        return root && this.minAt(root.left) || root;
    }

    predecessor(element: T): T {
        const predecessor = this.predecessorAt(this.root, element);
        return predecessor && predecessor.element;
    }

    private predecessorAt(root: Node<T>, element: T): Node<T> {
        if (!root) {
            return undefined;
        }

        if (root.element === element) {
            return this.maxAt(root.left);
        }

        const comparison = this.compare(element, root.element);
        if (comparison < 0) {
            return this.predecessorAt(root.left, element);
        } else {
            return this.predecessorAt(root.right, element) || root;
        }
    }

    successor(element: T): T {
        const successor = this.successorAt(this.root, element);
        return successor && successor.element;
    }

    private successorAt(root: Node<T>, element: T): Node<T> {
        if (!root) {
            return undefined;
        }

        if (root.element === element) {
            return this.minAt(root.right);
        }

        if (this.compare(element, root.element) < 0) {
            return this.successorAt(root.left, element) || root;
        } else {
            return this.successorAt(root.right, element);
        }
    }
}
