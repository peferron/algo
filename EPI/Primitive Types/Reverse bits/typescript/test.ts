import reverse16 from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {value: number, reversed: number}[] = [
    {value: 0b0000000000000000, reversed: 0b0000000000000000},
    {value: 0b0000000000000001, reversed: 0b1000000000000000},
    {value: 0b1000000000000000, reversed: 0b0000000000000001},
    {value: 0b1001000100001000, reversed: 0b0001000010001001},
    {value: 0b1001111100001000, reversed: 0b0001000011111001},
];

for (const test of tests) {
    const actual = reverse16(test.value);
    assert.strictEqual(actual, test.reversed,
        `For value ${test.value} (0b${test.value.toString(2)}), ` +
        `expected reversed to be ${test.reversed} (0b${test.reversed.toString(2)}), ` +
        `but was ${actual} (0b${actual.toString(2)})`);
}
