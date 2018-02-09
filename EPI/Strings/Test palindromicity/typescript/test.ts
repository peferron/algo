import {isPalindromeSimple, isPalindromeSmart} from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {s: string, isPalindrome: boolean}[] = [
    {s: "", isPalindrome: true},
    {s: ",!", isPalindrome: true},
    {s: "a", isPalindrome: true},
    {s: "a!", isPalindrome: true},
    {s: "ab", isPalindrome: false},
    {s: "aa", isPalindrome: true},
    {s: "aba", isPalindrome: true},
    {s: "  a ba", isPalindrome: true},
    {s: "A man, a plan, a canal, Panama", isPalindrome: true},
    {s: "A woman, a plan, a canal, Panama", isPalindrome: false},
];

for (const f of [isPalindromeSimple, isPalindromeSmart]) {
    for (const test of tests) {
        const actual = f(test.s);
        assert.strictEqual(actual, test.isPalindrome, `For test string ${test.s}, ` +
            `using function ${f.name}, expected isPalindrome to be ${test.isPalindrome}, ` +
            `but was ${actual}`);
    }
}
