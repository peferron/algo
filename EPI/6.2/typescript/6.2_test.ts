import increment from './6.2';

declare function require(name: string): any;
const assert = require('assert');

const tests: {before: number[], after: number[]}[] = [
    {before: [0], after: [1]},
    {before: [9], after: [1, 0]},
    {before: [1, 2, 3], after: [1, 2, 4]},
    {before: [1, 2, 9], after: [1, 3, 0]},
    {before: [1, 9, 9], after: [2, 0, 0]},
    {before: [9, 9, 9], after: [1, 0, 0, 0]},
];

for (const test of tests) {
    const actual = [...test.before];
    increment(actual);
    assert.deepStrictEqual(actual, test.after, `For digits ${test.before}, ` +
        `expected incremented digits to be ${test.after}, but were ${actual}`);
}
