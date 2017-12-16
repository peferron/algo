import permute from './6.10';

declare function require(name: string): any;
const assert = require('assert');
// const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {before: string[], permutation: number[], after: string[]}[] = [
    {before: ['a'], permutation: [0], after: ['a']},
    {before: [], permutation: [], after: []},
    {before: ['a', 'b', 'c'], permutation: [1, 0, 2], after: ['b', 'a', 'c']},
    {before: ['a', 'b', 'c'], permutation: [0, 1, 2], after: ['a', 'b', 'c']},
    {before: ['a', 'b', 'c'], permutation: [1, 2, 0], after: ['c', 'a', 'b']},
    {before: ['a', 'b', 'c', 'd'], permutation: [2, 1, 0, 3], after: ['c', 'b', 'a', 'd']},
];

for (const test of tests) {
    const actual = [...test.before];
    permute(actual, test.permutation);
    assert.deepStrictEqual(actual, test.after,
        `For array ${test.before} and permutation ${test.permutation}, ` +
        `expected permuted array to be ${test.after}, but was ${actual}`);
}
