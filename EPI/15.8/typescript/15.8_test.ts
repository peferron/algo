import {Composite, smallestComposites} from './15.8';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {count: number, smallestComposites: Composite[]}[] = [
    {
        count: 0,
        smallestComposites: []
    },
    {
        count: 1,
        smallestComposites: [
            {a: 0, b: 0},
        ]
    },
    {
        count: 13,
        smallestComposites: [
            {a: 0, b: 0},
            {a: 1, b: 0},
            {a: 0, b: 1},
            {a: 2, b: 0},
            {a: 1, b: 1},
            {a: 0, b: 2},
            {a: 3, b: 0},
            {a: 2, b: 1},
            {a: 1, b: 2},
            {a: 4, b: 0},
            {a: 0, b: 3},
            {a: 3, b: 1},
            {a: 2, b: 2},
        ]
    },
];

for (const test of tests) {
    const actual = smallestComposites(test.count);
    assert.deepStrictEqual(actual, test.smallestComposites, `For test count ${test.count}, ` +
        `expected smallest composites to be ${inspect(test.smallestComposites)}, ` +
        `but were ${actual}`);
}
