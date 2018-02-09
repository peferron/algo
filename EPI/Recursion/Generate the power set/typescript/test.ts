import powerSet from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {set: number[], powerSet: number[][]}[] = [
    {
        set: [],
        powerSet: [[]]
    },
    {
        set: [0],
        powerSet: [[], [0]]
    },
    {
        set: [0, 1],
        powerSet: [[], [0], [1], [0, 1]]
    },
    {
        set: [0, 1, 2],
        powerSet: [[], [0], [1], [0, 1], [2], [0, 2], [1, 2], [0, 1, 2]]
    },
];

for (const test of tests) {
    const actual = powerSet(test.set);
    assert.deepStrictEqual(actual, test.powerSet, `For set ${inspect(test.set)}, ` +
        `expected power set to be ${inspect(test.powerSet)}, but was ${inspect(actual)}`);
}
