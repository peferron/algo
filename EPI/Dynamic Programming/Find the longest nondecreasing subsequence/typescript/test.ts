import lengthOfLongestNondecreasingSubsequence from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {values: number[], length: number}[] = [
    {values: [], length: 0},
    {values: [10], length: 1},
    {values: [10, 9], length: 1},
    {values: [9, 10], length: 2},
    {values: [10, 10], length: 2},
    {values: [3, 0, 4, 2, 3, 5], length: 4},
    {values: [0, 8, 4, 12, 2, 10, 6, 14, 1, 9], length: 4},
];

for (const test of tests) {
    const actual = lengthOfLongestNondecreasingSubsequence(test.values);
    assert.strictEqual(actual, test.length, `For values ${test.values}, ` +
        `expected length of longest nondecreasing subsequence to be ${test.length}, ` +
        `but was ${actual}`);
}
