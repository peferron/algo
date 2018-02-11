import {Node, reconstructFromPreOrder} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const trimUndefined = (tree: Node | undefined) => {
    if (!tree) {
        return undefined;
    }

    const copy: Node = {value: tree.value};

    if (tree.left) {
        copy.left = trimUndefined(tree.left);
    }

    if (tree.right) {
        copy.right = trimUndefined(tree.right);
    }

    return copy;
}

const tests: {preorder: number[], tree: Node}[] = [
    {
        preorder: [1, 2, 3],
        tree: {
            value: 1,
            right: {
                value: 2,
                right: {value: 3}
            }
        }
    },
    {
        preorder: [1, 3, 2],
        tree: {
            value: 1,
            right: {
                value: 3,
                left: {value: 2}
            }
        }
    },
    {
        preorder: [2, 1, 3],
        tree: {
            value: 2,
            left: {value: 1},
            right: {value: 3}
        }
    },
    // (
    //     preorder: [2, 3, 1],
    //     tree: impossible!
    // },
    {
        preorder: [3, 1, 2],
        tree: {
            value: 3,
            left: {
                value: 1,
                right: {value: 2}
            }
        }
    },
    {
        preorder: [3, 2, 1],
        tree: {
            value: 3,
            left: {
                value: 2,
                left: {value: 1}
            }
        }
    },
    {
        preorder: [108, 106, -10, -14, 2, 107, 285, 243, 286, 401],
        tree: {
            value: 108,
            left: {
                value: 106,
                left: {
                    value: -10,
                    left: {value: -14},
                    right: {value: 2}
                },
                right: {value: 107}
            },
            right: {
                value: 285,
                left: {value: 243},
                right: {
                    value: 286,
                    right: {value: 401}
                }
            }
        }
    },
]

for (const test of tests) {
    const actual = trimUndefined(reconstructFromPreOrder(test.preorder));
    assert.deepStrictEqual(actual, test.tree, `For preorder traversal ${inspect(test.preorder)}, ` +
        `expected tree to be ${inspect(test.tree)}, but was ${inspect(actual)}`);
}
