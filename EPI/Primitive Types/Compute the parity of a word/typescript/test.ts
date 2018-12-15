import parity32 from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {value: number, parity: number}[] = [
    {value: 0, parity: 0},
    {value: 1, parity: 1},
    {value: 2, parity: 1},
    {value: 3, parity: 0},
    {value: 5277, parity: 1},
];

for (const test of tests) {
    const actual = parity32(test.value);
    assert.strictEqual(actual, test.parity, `For value ${test.value}, ` +
        `expected parity to be ${test.parity}, but was ${actual}`);
}
