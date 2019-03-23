import maxGain from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {values: number[], maxGain: number}[] = [
    {values: [], maxGain: 0},
    {values: [3], maxGain: 3},
    {values: [2, 3], maxGain: 3},
    {values: [3, 2], maxGain: 3},
    {values: [1, 5, 2], maxGain: 3},
    {values: [10, 25, 5, 1, 10, 5], maxGain: 31},
];

for (const test of tests) {
    const actual = maxGain(test.values);
    assert.strictEqual(actual, test.maxGain, `For values ${inspect(test.values)}, ` +
        `expected max gain to be ${test.maxGain}, but was ${actual}`);
}
