import sqrt from './12.6';

declare function require(name: string): any;
const assert = require('assert');

const tests: {x: number, tolerance: number, sqrt: number}[] = [
    {
        x: 0,
        tolerance: 0.1,
        sqrt: 0
    },
    {
        x: 0.25,
        tolerance: 0.1,
        sqrt: 0.5
    },
    {
        x: 10,
        tolerance: 0.1,
        sqrt: 3.16
    },
];

for (const test of tests) {
    const actual = sqrt(test.x);
    assert(Math.abs(actual - test.sqrt) < test.tolerance, `For test x ${test.x}, ` +
        `and tolerance ${test.tolerance}, expected sqrt to be close to ${test.sqrt}, ` +
        `but was ${actual}`);
}

