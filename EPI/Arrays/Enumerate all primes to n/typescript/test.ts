import primes from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {max: number, primes: number[]}[] = [
    {max: -1, primes: []},
    {max: -0, primes: []},
    {max: 1, primes: []},
    {max: 2, primes: [2]},
    {max: 4, primes: [2, 3]},
    {max: 20, primes: [2, 3, 5, 7, 11, 13, 17, 19]},
];

for (const test of tests) {
    const actual = primes(test.max);
    assert.deepStrictEqual(actual, test.primes, `For max ${test.max}, ` +
        `expected primes to be ${test.primes}, but were ${actual}`);
}
