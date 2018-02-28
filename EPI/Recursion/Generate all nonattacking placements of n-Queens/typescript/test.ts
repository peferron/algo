import getNonAttackingPlacements from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {n: number, nonAttackingPlacements: number[][]}[] = [
    {
        n: 0,
        nonAttackingPlacements: [
            [],
        ]
    },
    {
        n: 1,
        nonAttackingPlacements: [
            [0],
        ]
    },
    {
        n: 2,
        nonAttackingPlacements: []
    },
    {
        n: 3,
        nonAttackingPlacements: []
    },
    {
        n: 4,
        nonAttackingPlacements: [
            [1, 3, 0, 2],
            [2, 0, 3, 1],
        ]
    },
];

for (const test of tests) {
    const actual = getNonAttackingPlacements(test.n);
    assert.deepStrictEqual(actual, test.nonAttackingPlacements, `For n ${test.n}, ` +
        `expected non-attacking placements to be ${inspect(test.nonAttackingPlacements)}, ` +
        `but were ${inspect(actual)}`);
}
