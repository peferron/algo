import merge from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {sortedArrays: number[][], merged: number[]}[] = [
    {
        sortedArrays: [],
        merged: []
    },
    {
        sortedArrays: [
            [],
            [],
        ],
        merged: []
    },
    {
        sortedArrays: [
            [3],
            [2],
        ],
        merged: [2, 3]
    },
    {
        sortedArrays: [
            [1, 4, 12],
            [2, 8, 11, 15, 65],
        ],
        merged: [1, 2, 4, 8, 11, 12, 15, 65]
    },
    {
        sortedArrays: [
            [1, 4, 12],
            [2, 8, 11, 15, 65],
            [99],
            [],
            [1, 3, 7, 11, 80],
        ],
        merged: [1, 1, 2, 3, 4, 7, 8, 11, 11, 12, 15, 65, 80, 99]
    },
];

for (const test of tests) {
    const actual = merge(test.sortedArrays);
    assert.deepStrictEqual(actual, test.merged,
        `For sorted arrays ${inspect(test.sortedArrays)}, ` +
        `expected merged to be ${inspect(test.merged)}, but was ${inspect(actual)}`);
}
