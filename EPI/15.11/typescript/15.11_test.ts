import {Tree, BST} from './15.11';

declare function require(name: string): any;
const assert = require('assert');

const trimUndefined = <T>(root: Tree<T> | undefined) => {
    if (!root) {
        return undefined;
    }

    const copy: Tree<T> = {data: root.data};

    if (root.left) {
        copy.left = trimUndefined(root.left);
    }

    if (root.right) {
        copy.right = trimUndefined(root.right);
    }

    return copy;
}

const tree = new BST<number>((a, b) => a - b);

tree.insert(10);
tree.insert(5);
tree.insert(12);
tree.insert(11);

assert.deepStrictEqual(trimUndefined(tree.root), {
    data: 10,
    left: {data: 5},
    right: {
        data: 12,
        left: {data: 11}
    }
});

tree.insert(13);
tree.insert(13);
tree.insert(13);

assert.deepStrictEqual(trimUndefined(tree.root), {
    data: 10,
    left: {data: 5},
    right: {
        data: 12,
        left: {data: 11},
        right: {data: 13}
    }
});

tree.delete(10);

assert.deepStrictEqual(trimUndefined(tree.root), {
    data: 5,
    right: {
        data: 12,
        left: {data: 11},
        right: {data: 13}
    }
});

tree.delete(12);

assert.deepStrictEqual(trimUndefined(tree.root), {
    data: 5,
    right: {
        data: 11,
        right: {data: 13}
    }
});

tree.delete(11);

assert.deepStrictEqual(trimUndefined(tree.root), {
    data: 5,
    right: {data: 13}
});

tree.delete(13);

assert.deepStrictEqual(trimUndefined(tree.root), {data: 5});

tree.delete(5);

assert.deepStrictEqual(trimUndefined(tree.root), undefined);
