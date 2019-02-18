import {maxSubarraySumBruteForce, maxSubarraySumSmart} from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {array: number[], max: number}[] = [
    {
        array: [5, -2, 1],
        max: 1 + 5,
    },
    {
        array: [0, -1, 3, 3],
        max: 3 + 3,
    },
    {
        array: [904, 40, 523, 12, -335, -385, -124, 481, -31],
        max: 481 - 31 + 904 + 40 + 523 + 12,
    },
];

function runStaticTests() {
    for (const f of [maxSubarraySumBruteForce, maxSubarraySumSmart]) {
        for (const test of tests) {
            const actual = f(test.array);
            assert.strictEqual(actual, test.max, `Using function ${f.name}, for array ${test.array}, ` +
                `expected maximum subarray sum to be ${test.max}, but was ${actual}`);
        }
    }
}

function runRandomTest() {
    const a = Array.from(
        {length: Math.floor(Math.random() * 5)},
        () => Math.floor(Math.random() * 10 - 5)
    );

    const bruteForce = maxSubarraySumBruteForce(a);
    const smart = maxSubarraySumSmart(a);

    assert.strictEqual(bruteForce, smart, `For array ${a}, ` +
        `brute force maximum subarray sum was ${bruteForce}, ` +
        `but smart maximum subarray sum was ${smart}`);
}

function runRandomTests() {
    for (let i = 0; i < 100; i += 1) {
        runRandomTest();
    }
}

runStaticTests();
runRandomTests();
