import {Cell, flip} from './19.2';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {grid: boolean[][], cell: Cell, flipped: boolean[][]}[] = [
    {
        grid: [
            [true,  true,  true,  true],
            [true,  true,  true,  true],
            [true,  true,  true,  true],
            [true,  true,  true,  true],
        ],
        cell: {row: 2, col: 1},
        flipped: [
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false],
        ]
    },
    {
        grid: [
            [false, true,  true,  true],
            [true,  false, false, true],
            [true,  true,  false, true],
            [true,  true,  false, true],
        ],
        cell: {row: 2, col: 1},
        flipped: [
            [false, true,  true,  true],
            [false, false, false, true],
            [false, false, false, true],
            [false, false, false, true],
        ]
    },
    {
        grid: [
            [false, true,  true,  true],
            [true,  false, false, true],
            [true,  true,  false, true],
            [true,  true,  false, true],
        ],
        cell: {row: 1, col: 1},
        flipped: [
            [false, true,  true,  true],
            [true,  true,  true,  true],
            [true,  true,  true,  true],
            [true,  true,  true,  true],
        ]
    },
];

for (const test of tests) {
    const actual = test.grid.map(row => row.slice());
    flip(actual, test.cell);
    assert.deepStrictEqual(actual, test.flipped,
        `For grid ${inspect(test.grid)} and cell ${inspect(test.cell)}, ` +
        `expected flipped to be ${inspect(test.flipped)}, but was ${inspect(actual)}`);
}
