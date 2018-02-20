import permutations from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {array: number[], permutations: number[][]}[] = [
    {
        array: [],
        permutations: [
            [],
        ]
    },
    {
        array: [10],
        permutations: [
            [10],
        ]
    },
    {
        array: [10, 5],
        permutations: [
            [5, 10],
            [10, 5],
        ]
    },
    {
        array: [10, 5, 3],
        permutations: [
            [3, 5, 10],
            [5, 3, 10],
            [3, 10, 5],
            [10, 3, 5],
            [5, 10, 3],
            [10, 5, 3],
        ]
    },
]

for (const test of tests) {
    const actual = permutations(test.array);
    assert.deepStrictEqual(actual, test.permutations, `For array ${inspect(test.array)}, ` +
        `expected permutations to be ${inspect(test.permutations)}, but was ${inspect(actual)}`);
}
