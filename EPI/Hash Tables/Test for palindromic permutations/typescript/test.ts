import isPalindromePermutation from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {string: string, isPalindromePermutation: boolean}[] = [
    {string: "", isPalindromePermutation: true},
    {string: "a", isPalindromePermutation: true},
    {string: "aa", isPalindromePermutation: true},
    {string: "ab", isPalindromePermutation: false},
    {string: "aab", isPalindromePermutation: true},
    {string: "acb", isPalindromePermutation: false},
    {string: "edified", isPalindromePermutation: true},
    {string: "redified", isPalindromePermutation: false},
];

for (const test of tests) {
    const actual = isPalindromePermutation(test.string);
    assert.strictEqual(actual, test.isPalindromePermutation, `For string ${test.string}, ` +
        `expected isPalindromePermutation to be ${test.isPalindromePermutation}, ` +
        `but was ${actual}`);
}
