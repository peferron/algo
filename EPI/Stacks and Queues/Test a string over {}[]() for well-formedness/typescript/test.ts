import isWellFormed from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {string: string, isWellFormed: boolean}[] = [
    {string: "", isWellFormed: true},
    {string: "a", isWellFormed: true},
    {string: "()", isWellFormed: true},
    {string: "(()", isWellFormed: false},
    {string: "())", isWellFormed: false},
    {string: "{[]}", isWellFormed: true},
    {string: "{[}]", isWellFormed: false},
    {string: "a{bcd(e[z])f[gh]ij}kl", isWellFormed: true},
    {string: "a{bcd(e[z])f[gh]ij}kl[m", isWellFormed: false},
];

for (const test of tests) {
    const actual = isWellFormed(test.string);
    assert.strictEqual(actual, test.isWellFormed, `For string ${test.string}, ` +
        `expected wellFormed to be ${test.isWellFormed}, but was ${actual}`);
}
