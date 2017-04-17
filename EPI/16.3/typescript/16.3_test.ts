import permutations from './16.3';

declare function require(name: String): any;
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
            [10, 5],
            [5, 10],
        ]
    },
    {
        array: [10, 5, 3],
        permutations: [
            [10, 5, 3],
            [10, 3, 5],
            [5, 10, 3],
            [5, 3, 10],
            [3, 10, 5],
            [3, 5, 10],
        ]
    },
]

for (const test of tests) {
    const actual = permutations(test.array);
    assert.deepStrictEqual(actual, test.permutations, `For array ${inspect(test.array)}, ` +
        `expected permutations to be ${inspect(test.permutations)}, but was ${inspect(actual)}`);
}
