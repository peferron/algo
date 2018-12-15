import getKthLargest from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {array: number[], k: number, element: number}[] = [
    {
        array: [0, 2, 50, 3, 4, 7, 9, 11, 5],
        k: 0,
        element: 50
    },
    {
        array: [0, 2, 50, 3, 4, 7, 9, 11, 5],
        k: 1,
        element: 11
    },
    {
        array: [0, 2, 50, 3, 4, 7, 9, 11, 5],
        k: 2,
        element: 9
    },
    {
        array: [0, 2, 50, 3, 4, 7, 9, 11, 5],
        k: 7,
        element: 2
    },
    {
        array: [0, 2, 50, 3, 4, 7, 9, 11, 5],
        k: 8,
        element: 0
    },
];

for (const test of tests) {
    const actual = getKthLargest([...test.array], test.k);
    assert.strictEqual(actual, test.element, `For array ${test.array} and k ${test.k}, ` +
        `expected kth largest element element to be ${test.element}, but was ${actual}`);
}
