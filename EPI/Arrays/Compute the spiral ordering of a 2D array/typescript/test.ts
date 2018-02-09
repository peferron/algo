import {spiralOrderingShort, spiralOrderingLong} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {array: number[][], spiralOrdering: number[]}[] = [
    {
        array: [],
        spiralOrdering: []
    },
    {
        array: [
            [0],
        ],
        spiralOrdering: [0]
    },
    {
        array: [
            [0, 1],
            [2, 3],
        ],
        spiralOrdering: [0, 1, 3, 2]
    },
    {
        array: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ],
        spiralOrdering: [0, 1, 2, 5, 8, 7, 6, 3, 4]
    },
    {
        array: [
            [ 0,  1,  2,  3],
            [ 4,  5,  6,  7],
            [ 8,  9, 10, 11],
            [12, 13, 14, 15],
        ],
        spiralOrdering: [0, 1, 2, 3, 7, 11, 15, 14, 13, 12, 8, 4, 5, 6, 10, 9]
    },
];

for (const f of [spiralOrderingShort, spiralOrderingLong]) {
    for (const test of tests) {
        const actual = f(test.array);
        assert.deepStrictEqual(actual, test.spiralOrdering, `For array ${inspect(test.array)}, ` +
            `using function ${f.name}, expected spiral ordering to be ${test.spiralOrdering}, ` +
            `but was ${inspect(actual)}`);
    }
}
