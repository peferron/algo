import evaluate from './7.9';

declare function require(name: string): any;
const assert = require('assert');

const tests: {roman: string, value: number}[] = [
    {roman: '', value: 0},
    {roman: 'I', value: 1},
    {roman: 'III', value: 3},
    {roman: 'IV', value: 4},
    {roman: 'VI', value: 6},
    {roman: 'XXXXXIIIIIIIII', value: 59},
    {roman: 'LVIIII', value: 59},
    {roman: 'LIX', value: 59},
    {roman: 'MDC', value: 1600},
    {roman: 'CMCD', value: 1300},
];

for (const test of tests) {
    const actual = evaluate(test.roman);
    assert.strictEqual(actual, test.value, `For ${test.roman}, ` +
        `expected value to be ${test.value}, but was ${actual}`);
}
