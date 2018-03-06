import {Node, reconstruct} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const trimUndefined = <T>(tree: Node<T> | undefined) => {
    if (!tree) {
        return undefined;
    }

    const copy: Node<T> = {value: tree.value};

    if (tree.left) {
        copy.left = trimUndefined(tree.left);
    }

    if (tree.right) {
        copy.right = trimUndefined(tree.right);
    }

    return copy;
}

const tests: {inOrder: number[], preOrder: number[], tree: Node<number> | undefined}[] = [
    {
        inOrder: [],
        preOrder: [],
        tree: undefined
    },
    {
        inOrder: [4, 2, 1, 5, 3, 6],
        preOrder: [1, 2, 4, 3, 5, 6],
        tree: {
            value: 1,
            left: {
                value: 2,
                left: {value: 4}
            },
            right: {
                value: 3,
                left: {value: 5},
                right: {value: 6}
            }
        }
    },
    {
        inOrder: [5, 1, 0, 4, 7, 2, 3, 8, 6],
        preOrder: [7, 1, 5, 4, 0, 2, 3, 6, 8],
        tree: {
            value: 7,
            left: {
                value: 1,
                left: {value: 5},
                right: {
                    value: 4,
                    left: {value: 0}
                }
            },
            right: {
                value: 2,
                right: {
                    value: 3,
                    right: {
                        value: 6,
                        left: {
                            value: 8
                        }
                    }
                }
            }
        }
    },
];

for (const test of tests) {
    const actual = trimUndefined(reconstruct(test.inOrder, test.preOrder));
    assert.deepStrictEqual(actual, test.tree,
        `For in-order traversal ${test.inOrder} and pre-order traversal ${test.preOrder}, ` +
        `expected tree to be ${inspect(test.tree)}, but was ${inspect(actual)}`);
}
