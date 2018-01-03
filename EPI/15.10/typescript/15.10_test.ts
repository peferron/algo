import {Node, createBalancedBST} from './15.10';

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

const tests: {values: number[], tree: Node | undefined}[] = [
    {
        values: [],
        tree: undefined
    },
    {
        values: [1, 2, 3],
        tree: {
            value: 2,
            left: {value: 1},
            right: {value: 3}
        }
    },
    {
        values: [2, 3, 5, 7, 11, 13, 17, 19, 23],
        tree: {
            value: 11,
            left: {
                value: 5,
                left: {
                    value: 3,
                    left: {value: 2}
                },
                right: {value: 7}
            },
            right: {
                value: 19,
                left: {
                    value: 17,
                    left: {value: 13}
                },
                right: {value: 23}
            }
        }
    },
];

for (const test of tests) {
    const actual = trimUndefined(createBalancedBST(test.values));
    assert.deepStrictEqual(actual, test.tree, `For values ${test.values}, ` +
        `expected tree to be ${inspect(test.tree)}, but was ${inspect(actual)}`);
}
