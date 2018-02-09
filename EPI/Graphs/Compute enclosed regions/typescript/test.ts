import {Color, fillEnclosed} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {grid: Color[][], filled: Color[][]}[] = [
    {
        grid: [
            [Color.WHITE, Color.BLACK],
            [Color.BLACK, Color.WHITE],
        ],
        filled: [
            [Color.WHITE, Color.BLACK],
            [Color.BLACK, Color.WHITE],
        ]
    },
    {
        grid: [
            [Color.WHITE, Color.BLACK, Color.BLACK],
            [Color.BLACK, Color.WHITE, Color.BLACK],
            [Color.WHITE, Color.BLACK, Color.BLACK],
        ],
        filled: [
            [Color.WHITE, Color.BLACK, Color.BLACK],
            [Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.WHITE, Color.BLACK, Color.BLACK],
        ]
    },
    {
        grid: [
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.WHITE, Color.BLACK, Color.WHITE, Color.BLACK],
            [Color.BLACK, Color.WHITE, Color.WHITE, Color.BLACK],
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
        ],
        filled: [
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.WHITE, Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
            [Color.BLACK, Color.BLACK, Color.BLACK, Color.BLACK],
        ]
    },
];

for (const test of tests) {
    const actual = test.grid.map(colors => colors.slice());
    fillEnclosed(actual);
    assert.deepStrictEqual(actual, test.filled, `For grid ${inspect(test.grid)}, ` +
        `expected filled to be ${inspect(test.filled)}, but was ${inspect(actual)}`);
}
