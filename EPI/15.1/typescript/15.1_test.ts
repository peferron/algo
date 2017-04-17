import {Node, isBST} from './15.1';

declare function require(name: String): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {root: Node, isBST: boolean}[] = [
    {
        root: {value: 1},
        isBST: true
    },
    {
        root: {
            value: 1,
            left: {value: 1},
            right: {value: 1}
        },
        isBST: true
    },
    {
        root: {
            value: 1,
            left: {value: 0},
            right: {value: 2}
        },
        isBST: true
    },
    {
        root: {
            value: 1,
            left: {value: 0},
            right: {value: 0}
        },
        isBST: false
    },
    {
        root: {
            value: 1,
            left: {value: 2},
            right: {value: 0}
        },
        isBST: false
    },
    {
        root: {
            value: 10,
            left: {
                value: 5,
                left: {value: 3},
                right: {value: 6}
            },
            right: {
                value: 10,
                left: {value: 10},
                right: {value: 15}
            }
        },
        isBST: true
    },
    {
        root: {
            value: 10,
            left: {
                value: 5,
                left: {value: 3},
                right: {value: 12}
            },
            right: {
                value: 10,
                left: {value: 10},
                right: {value: 15}
            }
        },
        isBST: false
    },
    {
        root: {
            value: 10,
            left: {
                value: 5,
                left: {value: 3},
                right: {value: 6}
            },
            right: {
                value: 10,
                left: {value: 9},
                right: {value: 5}
            }
        },
        isBST: false
    },
]

for (const test of tests) {
    const actual = isBST(test.root);
    assert.strictEqual(actual, test.isBST, `For test root ${inspect(test.root)}, ` +
        `expected isBST to be ${test.isBST}, but was ${actual}`);
}
