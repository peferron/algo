import multiply from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {a: number[], b: number[], product: number[]}[] = [
    {
        a: [0],
        b: [1],
        product: [0],
    },
    {
        a: [-1, 3],
        b: [1, 0],
        product: [-1, 3, 0],
    },
    {
        a: [2],
        b: [-3],
        product: [-6],
    },
    {
        a: [-2],
        b: [-4],
        product: [8],
    },
    {
        a: [8, 3],
        b: [5],
        product: [4, 1, 5],
    },
    {
        a: [0],
        b: [2, 2],
        product: [0],
    },
    {
        a: [4, 7, 8],
        b: [6, 9],
        product: [3, 2, 9, 8, 2],
    },
    {
        a: [4, 7, 8],
        b: [1, 7, 6, 9],
        product: [8, 4, 5, 5, 8, 2],
    }
];

for (const test of tests) {
    const actual = multiply(test.a, test.b);
    assert.deepStrictEqual(actual, test.product, `For arrays ${test.a} and ${test.b}, ` +
        `expected product to be ${test.product}, but was ${actual}`);
}
