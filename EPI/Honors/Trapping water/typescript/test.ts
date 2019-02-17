import maxWater from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {heights: number[], maxWater: number}[] = [
    {
        heights: [],
        maxWater: 0
    },
    {
        heights: [1],
        maxWater: 0
    },
    {
        heights: [1, 1],
        maxWater: 0
    },
    {
        heights: [1, 3],
        maxWater: 0
    },
    {
        heights: [1, 2, 1, 3, 0, 2],
        maxWater: 3
    },
    {
        heights: [2, 0, 1, 3],
        maxWater: 3
    },
    {
        heights: [4, 2, 0, 1, 3],
        maxWater: 6
    },
    {
        heights: [1, 2, 1, 3, 4, 4, 5, 1, 2, 0, 3],
        maxWater: 7
    },
    {
        heights: [0, 1, 2, 1, 3, 4, 4, 5, 1, 2, 0, 3, 0],
        maxWater: 7
    },
];

for (const test of tests) {
    const actual = maxWater(test.heights);
    assert.strictEqual(actual, test.maxWater, `For heights ${test.heights}, ` +
        `expected max water to be ${test.maxWater}, but was ${actual}`);
}
