import maxArea from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {heights: number[], maxArea: number}[] = [
    {heights: [], maxArea: 0},
    {heights: [0], maxArea: 0},
    {heights: [2], maxArea: 2},
    {heights: [2, 2], maxArea: 4},
    {heights: [2, 3], maxArea: 4},
    {heights: [3, 3], maxArea: 6},
    {heights: [2, 3, 2], maxArea: 6},
    {heights: [1, 4, 2, 5, 6, 3, 2, 6, 6, 5, 2, 1, 3], maxArea: 20},
];

for (const test of tests) {
    const actual = maxArea(test.heights);
    assert.strictEqual(actual, test.maxArea, `For heights ${inspect(test.heights)}, ` +
        `expected max area to be ${test.maxArea}, but was ${actual}`);
}
