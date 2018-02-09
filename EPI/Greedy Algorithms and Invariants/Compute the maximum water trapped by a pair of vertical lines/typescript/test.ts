import maxWaterPair from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {heights: number[], maxPair: {left: number, right: number}}[] = [
    {
        heights: [0, 0],
        maxPair: {left: 0, right: 1}
    },
    {
        heights: [1, 3, 3],
        maxPair: {left: 1, right: 2}
    },
    {
        heights: [1, 3, 3],
        maxPair: {left: 1, right: 2}
    },
    {
        heights: [2, 3, 3],
        maxPair: {left: 0, right: 2}
    },
    {
        heights: [1, 2, 1, 3, 4, 4, 5, 6, 2, 1, 3, 1, 3, 2, 1, 2, 4, 1],
        maxPair: {left: 4, right: 16}
    },
];

for (const test of tests) {
    const actual = maxWaterPair(test.heights);
    assert.deepStrictEqual(actual, test.maxPair, `For heights ${test.heights}, ` +
        `expected max water pair to be ${inspect(test.maxPair)}, but was ${inspect(actual)}`);
}
