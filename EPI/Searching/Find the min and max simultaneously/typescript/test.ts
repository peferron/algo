import extremes from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {values: number[], result: {min?: number, max?: number}}[] = [
    {
        values: [],
        result: {}
    },
    {
        values: [5],
        result: {min: 5, max: 5}
    },
    {
        values: [2, 50, 3, 11, 5],
        result: {min: 2, max: 50}
    },
    {
        values: [2, 9, 50, 3, 11, 5],
        result: {min: 2, max: 50}
    },
    {
        values: [5, 3, 50, 11, 2],
        result: {min: 2, max: 50}
    },
    {
        values: [5, 3, 50, 11, 9, 2],
        result: {min: 2, max: 50}
    },
];

for (const test of tests) {
    const actual = extremes(test.values);
    assert.deepStrictEqual(actual, test.result, `For values ${test.values}, ` +
        `expected result to be ${inspect(test.result)}, but was ${inspect(actual)}`);
}
