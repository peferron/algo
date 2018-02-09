import {Node, isSymmetric} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {tree: Node<number>, isSymmetric: boolean}[] = [
    {
        tree: {value: 0},
        isSymmetric: true
    },
    {
        tree: {
            value: 0,
            left: {
                value: 1,
                right: {value: 2}
            },
            right: {
                value: 1,
                left: {value: 2}
            }
        },
        isSymmetric: true
    },
    {
        tree: {
            value: 0,
            left: {
                value: 1,
                right: {value: 2}
            },
            right: {
                value: 1,
                left: {value: 3}
            }
        },
        isSymmetric: false
    },
    {
        tree: {
            value: 0,
            left: {
                value: 1,
                right: {value: 2}
            },
            right: {
                value: 1,
                right: {value: 2}
            }
        },
        isSymmetric: false
    },
    {
        tree: {
            value: 0,
            left: {
                value: 1,
                right: {value: 2}
            },
            right: {
                value: 1,
                left: {value: 2},
                right: {value: 3}
            }
        },
        isSymmetric: false
    },
];

for (const test of tests) {
    const actual = isSymmetric(test.tree);
    assert.strictEqual(actual, test.isSymmetric, `For tree ${inspect(test.tree)}, ` +
        `expected isSymmetric to be ${test.isSymmetric}, but was ${actual}`);
}
