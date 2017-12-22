export interface Tree<T> {
    data: T;
    left?: Tree<T>;
    right?: Tree<T>;
}

export class BST<T> {
    root: Tree<T> | undefined;

    constructor(private cmp: (a: T, b: T) => number) {
    }

    insert(data: T): void {
        this.root = this.insertAt(data, this.root);
    }

    private insertAt(data: T, root: Tree<T> | undefined): Tree<T> {
        if (!root) {
            return {data};
        }

        const diff = this.cmp(data, root.data);

        if (diff < 0) {
            root.left = this.insertAt(data, root.left);
        } else if (diff > 0) {
            root.right = this.insertAt(data, root.right);
        }

        return root;
    }

    delete(data: T): void {
        this.root = this.deleteAt(data, this.root);
    }

    private deleteAt(data: T, root: Tree<T> | undefined): Tree<T> | undefined {
        if (!root) {
            return undefined;
        }

        const diff = this.cmp(data, root.data);

        if (diff < 0) {
            root.left = this.deleteAt(data, root.left);
            return root;
        }

        if (diff > 0) {
            root.right = this.deleteAt(data, root.right);
            return root;
        }

        const newRoot = this.maxAt(root.left) || this.minAt(root.right);

        if (!newRoot) {
            return undefined;
        }

        this.deleteAt(newRoot.data, root);
        root.data = newRoot.data;
        return root;
    }

    private minAt(root: Tree<T> | undefined): Tree<T> | undefined {
        return root && root.left ? this.minAt(root.left) : root;
    }

    private maxAt(root: Tree<T> | undefined): Tree<T> | undefined {
        return root && root.right ? this.minAt(root.right) : root;
    }
}
