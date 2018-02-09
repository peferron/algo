import convert from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {s1: string, b1: number, b2: number, s2: string}[] = [
    {s1: '0', b1: 10, b2: 16, s2: '0'},
    {s1: '-1', b1: 10, b2: 16, s2: '-1'},
    {s1: '-255', b1: 10, b2: 16, s2: '-FF'},
    {s1: '1', b1: 10, b2: 16, s2: '1'},
    {s1: '255', b1: 10, b2: 16, s2: 'FF'},
    {s1: '1010101101', b1: 2, b2: 10, s2: '685'},
];

for (const test of tests) {
    const actual = convert(test.s1, test.b1, test.b2);
    assert.strictEqual(actual, test.s2, `For s1 ${test.s1}, b1 ${test.b1} and b2 ${test.b2}, ` +
        `expected s2 to be ${test.s2}, but was ${actual}`);
}
