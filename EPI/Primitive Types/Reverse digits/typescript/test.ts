import reverse from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {number: number, reversed: number}[] = [
    {number: 0, reversed: 0},
    {number: 2321, reversed: 1232},
    {number: 34321, reversed: 12343},
    {number: -4892, reversed: -2984},
];

for (const test of tests) {
    const actual = reverse(test.number);
    assert.strictEqual(actual, test.reversed, `For number ${test.number}, ` +
        `expected reverse to be ${test.reversed}, but was ${actual}`);
}
