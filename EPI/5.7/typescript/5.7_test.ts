import {powRecursive, powIterative} from './5.7';

declare function require(name: string): any;
const assert = require('assert');

const tests: {base: number, exponent: number, result: number}[] = [
    {base: 0, exponent: 0, result: 1},
    {base: 0, exponent: 1, result: 0},
    {base: 1, exponent: 0, result: 1},
    {base: 1, exponent: 1, result: 1},
    {base: 1, exponent: 2, result: 1},
    {base: 2, exponent: 0, result: 1},
    {base: 2, exponent: 1, result: 2},
    {base: 2, exponent: 2, result: 4},
    {base: 2, exponent: -1, result: 0.5},
    {base: 2, exponent: -2, result: 0.25},
    {base: 12.5, exponent: 6, result: 3814697.265625},
];

for (const fn of [powRecursive, powIterative]) {
    for (const test of tests) {
        const actual = fn(test.base, test.exponent);
        assert.strictEqual(actual, test.result, `Using function ${fn.name}, ` +
            `for base ${test.base} and exponent ${test.exponent}, ` +
            `expected result to be ${test.result}, but was ${actual}`);
    }
}
