import {Peg, Move, hanoi} from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {n: number, moves: Move[]}[] = [
    {
        n: 0,
        moves: []
    },
    {
        n: 1,
        moves: [
            {from: Peg.P1, to: Peg.P2},
        ]
    },
    {
        n: 2,
        moves: [
            {from: Peg.P1, to: Peg.P3},
            {from: Peg.P1, to: Peg.P2},
            {from: Peg.P3, to: Peg.P2},
        ]
    },
    {
        n: 3,
        moves: [
            {from: Peg.P1, to: Peg.P2},
            {from: Peg.P1, to: Peg.P3},
            {from: Peg.P2, to: Peg.P3},
            {from: Peg.P1, to: Peg.P2},
            {from: Peg.P3, to: Peg.P1},
            {from: Peg.P3, to: Peg.P2},
            {from: Peg.P1, to: Peg.P2},
        ]
    },
];

for (const test of tests) {
    const actual = hanoi(test.n, Peg.P1, Peg.P2, Peg.P3);
    assert.deepStrictEqual(actual, test.moves, `For n ${test.n}, ` +
        `expected moves to be ${test.moves}, but were ${actual}`);
}
