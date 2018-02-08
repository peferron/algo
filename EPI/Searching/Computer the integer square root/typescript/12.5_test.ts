import sqrt from './12.5';

declare function require(name: string): any;
const assert = require('assert');

const tests: {n: number, sqrt: number}[] = [
    {n: 0, sqrt: 0},
    {n: 1, sqrt: 1},
    {n: 2, sqrt: 1},
    {n: 3, sqrt: 1},
    {n: 4, sqrt: 2},
    {n: 15, sqrt: 3},
    {n: 16, sqrt: 4},
    {n: 17, sqrt: 4},
    {n: 99, sqrt: 9},
];

for (let i = 0; i < 1000; i++) {
    const n = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    tests.push({n, sqrt: Math.floor(Math.sqrt(n))});
}

for (const test of tests) {
    const actual = sqrt(test.n);
    assert.strictEqual(actual, test.sqrt, `For number ${test.n}, ` +
        `expected integer square root to be ${test.sqrt}, but was ${actual}`);
}
