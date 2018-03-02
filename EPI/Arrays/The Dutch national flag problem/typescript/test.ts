import rearrangeDutch from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {arrayBefore: number[], pivotIndex: number, arrayAfter: number[]}[] = [
    {
        arrayBefore: [1],
        pivotIndex: 0,
        arrayAfter: [1]
    },
    {
        arrayBefore: [2, 1],
        pivotIndex: 0,
        arrayAfter: [1, 2]
    },
    {
        arrayBefore: [2, 1],
        pivotIndex: 1,
        arrayAfter: [1, 2]
    },
    {
        arrayBefore: [3, 2, 1, 2, 5],
        pivotIndex: 0,
        arrayAfter: [2, 1, 2, 3, 5]
    },
    {
        arrayBefore: [3, 2, 1, 2, 5],
        pivotIndex: 1,
        arrayAfter: [1, 2, 2, 3, 5]
    },
    {
        arrayBefore: [3, 2, 1, 2, 5],
        pivotIndex: 2,
        arrayAfter: [1, 2, 3, 2, 5]
    },
    {
        arrayBefore: [3, 2, 1, 2, 5],
        pivotIndex: 4,
        arrayAfter: [3, 2, 1, 2, 5]
    },
    {
        arrayBefore: [3, 2, 4, 6, 1, 8, 6, 6, 4, 2, -1],
        pivotIndex: 2,
        arrayAfter: [3, 2, 1, 2, -1, 4, 4, 6, 6, 8, 6]
    },
];

for (const test of tests) {
    const actual = test.arrayBefore.slice();
    rearrangeDutch(actual, test.pivotIndex);
    assert.deepStrictEqual(actual, test.arrayAfter,
        `For array ${test.arrayBefore} and pivot index ${test.pivotIndex} ` +
        `expected final array to be ${test.arrayAfter}, but was ${actual}`);
}

for (let i = 0; i < 1000; i += 1) {
    const length = Math.floor(Math.random() * 100);
    const array = Array.from({length}, () => Math.floor(Math.random() * 50));
    const pivotIndex = Math.floor(Math.random() * length);
    const pivot = array[pivotIndex];

    rearrangeDutch(array, pivotIndex);

    let seenEqual = false;
    let seenGreater = false;
    for (const v of array) {
        if (v < pivot) {
            assert(!seenEqual && !seenGreater);
        } else if (v === pivot) {
            assert(!seenGreater);
            seenEqual = true;
        } else {
            seenGreater = true;
        }
    }
}
