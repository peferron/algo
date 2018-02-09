import countTraversals from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {rows: number, cols: number, count: number}[] = [
    {rows: 1, cols: 1, count: 1},
    {rows: 1, cols: 2, count: 1},
    {rows: 2, cols: 2, count: 2},
    {rows: 2, cols: 3, count: 3},
    {rows: 3, cols: 3, count: 6},
    {rows: 5, cols: 5, count: 70},
];

for (const test of tests) {
    const actual = countTraversals(test.rows, test.cols);
    assert.strictEqual(actual, test.count, `For rows ${test.rows} and cols ${test.cols}, ` +
        `expected count to be ${test.count}, but was ${actual}`);
}
