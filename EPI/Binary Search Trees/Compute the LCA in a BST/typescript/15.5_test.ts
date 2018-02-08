import {Node, lca} from './15.5';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const find = (root: Node, value: number): Node =>
    value < root.value ? find(root.left!, value) :
    value > root.value ? find(root.right!, value) :
    root;

interface SubTest {
    a: number;
    b: number;
    lca: number;
}

const tests: {root: Node, subTests: SubTest[]}[] = [
    {
        root: {
            value: 10,
            left: {value: 5},
            right: {value: 15}
        },
        subTests: [
            {a: 10, b: 10, lca: 10},
            {a: 5, b: 5, lca: 5},
            {a: 5, b: 15, lca: 10},
        ]
    },
    {
        root: {
            value: 10,
            left: {
                value: 5,
                left: {value: 4},
                right: {value: 6}
            },
            right: {
                value: 15,
                left: {value: 12},
                right: {
                    value: 17,
                    left: {value: 16},
                    right: {value: 20}
                }
            }
        },
        subTests: [
            {a: 4, b: 15, lca: 10},
            {a: 4, b: 5, lca: 5},
            {a: 4, b: 6, lca: 5},
            {a: 16, b: 20, lca: 17},
            {a: 16, b: 12, lca: 15},
            {a: 20, b: 6, lca: 10},
        ]
    }
];

for (const test of tests) {
    for (const subTest of test.subTests) {
        const actual = lca(test.root, find(test.root, subTest.a), find(test.root, subTest.b)).value;
        assert.strictEqual(actual, subTest.lca,
            `For root ${inspect(test.root)}, a ${subTest.a} and b ${subTest.b}, ` +
            `expected lca to be ${subTest.lca}, but was ${actual}`);
    }
}
