import sort from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {values: number[], k: number, sorted: number[]}[] = [
    {
        values: [],
        k: 2,
        sorted: []
    },
    {
        values: [3],
        k: 2,
        sorted: [3]
    },
    {
        values: [3, -1, 2, 6, 4, 5, 8],
        k: 2,
        sorted: [-1, 2, 3, 4, 5, 6, 8]
    },
];

for (const test of tests) {
    const actual = [...sort(test.values[Symbol.iterator](), test.k)];
    assert.deepStrictEqual(actual, test.sorted, `For values ${test.values} and k ${test.k}, ` +
        `expected sorted values to be ${test.sorted}, but were ${actual}`);
}
