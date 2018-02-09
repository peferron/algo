import {isPalindromeReverseString, isPalindromeReverseNumber, isPalindromeLog} from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {number: number, isPalindrome: boolean}[] = [
    {number: 0, isPalindrome: true},
    {number: 1, isPalindrome: true},
    {number: 7, isPalindrome: true},
    {number: 11, isPalindrome: true},
    {number: 121, isPalindrome: true},
    {number: 333, isPalindrome: true},
    {number: 2147447412, isPalindrome: true},
    {number: 88765433456788, isPalindrome: true},
    {number: -1, isPalindrome: false},
    {number: 12, isPalindrome: false},
    {number: 100, isPalindrome: false},
    {number: 88765433446788, isPalindrome: false},
];

for (const f of [isPalindromeReverseString, isPalindromeReverseNumber, isPalindromeLog]) {
    for (const test of tests) {
        const actual = f(test.number);
        assert.strictEqual(actual, test.isPalindrome,
            `For number ${test.number} and using function ${f.name}, ` +
            `expected isPalindrome to be ${test.isPalindrome}, but was ${actual}`);
    }
}
