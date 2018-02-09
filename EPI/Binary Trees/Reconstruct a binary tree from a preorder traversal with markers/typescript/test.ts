import {Node, constructFromPreorder} from './main';

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

const tests: {preorder: (number | undefined)[], tree: Node<number> | undefined}[] = [
    {
        preorder: [],
        tree: undefined,
    },
    {
        preorder: [
            1,
                undefined,
                undefined,
        ],
        tree: {
            value: 1
        },
    },
    {
        preorder: [
            1,
                2,
                    undefined,
                    undefined,
            undefined,
        ],
        tree: {
            value: 1,
            left: {
                value: 2
            }
        }
    },
    {
        preorder: [
            7,
                1,
                    5,
                        undefined,
                        undefined,
                    4,
                        0,
                            undefined,
                            undefined,
                        undefined,
                2,
                    undefined,
                    3,
                        undefined,
                        6,
                            8,
                                undefined,
                                undefined,
                            undefined,
        ],
        tree: {
            value: 7,
            left: {
                value: 1,
                left: {
                    value: 5
                },
                right: {
                    value: 4,
                    left: {
                        value: 0
                    }
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
    }
];

for (const test of tests) {
    const actual = trimUndefined(constructFromPreorder(test.preorder));
    assert.deepStrictEqual(actual, test.tree, `For preorder traversal ${test.preorder}, ` +
        `expected tree to be ${inspect(test.tree)}, but was ${inspect(actual)}`);
}
