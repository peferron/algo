import {Node, isBalanced} from './10.1';

declare function require(name: String): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {root: Node, isBalanced: boolean}[] = [
    {
        root: {},
        isBalanced: true
    },
    {
        root: {
            left: {}
        },
        isBalanced: true
    },
    {
        root: {
            left: {}
        },
        isBalanced: true
    },
    {
        // Case where the root is unbalanced.
        root: {
            left: {
                left: {}
            }
        },
        isBalanced: false
    },
    {
        // Case where the root is balanced, but one of the subtrees is not.
        root: {
            left: {
                left: {},
                right: {}
            },
            right: {
                left: {
                    right: {}
                }
            }
        },
        isBalanced: false
    },
    {
        // Same as above, but the subtree has been balanced.
        root: {
            left: {
                left: {},
                right: {}
            },
            right: {
                left: {
                    right: {}
                },
                right: {}
            }
        },
        isBalanced: true
    },
];

for (const test of tests) {
    const actual = isBalanced(test.root);
    assert.strictEqual(actual, test.isBalanced, `For test tree ${inspect(test.root)}, ` +
        `expected isBalanced to be ${test.isBalanced}, but was ${actual}`);
}
