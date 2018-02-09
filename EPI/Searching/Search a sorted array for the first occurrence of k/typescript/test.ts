import firstIndexOf from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {array: number[], element: number, index: number}[] = [
    {
        array: [],
        element: 2,
        index: -1
    },
    {
        array: [1],
        element: 2,
        index: -1
    },
    {
        array: [1],
        element: 1,
        index: 0
    },
    {
        array: [1, 2, 3],
        element: 3,
        index: 2
    },
    {
        array: [1, 2, 2, 10, 12, 12],
        element: 12,
        index: 4
    },
    {
        array: [1, 2, 2, 10, 12, 12],
        element: 2,
        index: 1
    },
    {
        array: [2, 2, 2, 10, 12, 12],
        element: 2,
        index: 0
    },
    {
        array: [1, 1, 2, 10, 12, 12],
        element: 2,
        index: 2
    },
    {
        array: [1, 2, 3, 4, 4, 4, 4, 4, 5, 5, 6],
        element: 4,
        index: 3
    },
]

for (const test of tests) {
    const actual = firstIndexOf(test.array, test.element)
    assert.strictEqual(actual, test.index, `For test array ${inspect(test.array)} ` +
        `and element ${test.element}, expected index to be ${test.index}, but was ${actual}`);
}
