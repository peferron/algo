import combinations from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {score: number, plays: number[], combinations: number}[] = [
    // {score: 0, plays: [1, 3], combinations: 1},
    {score: 1, plays: [1, 2, 4], combinations: 1},
    {score: 2, plays: [1, 1], combinations: 3},
    {score: 7, plays: [2, 3, 7], combinations: 2},
    {score: 12, plays: [2, 3, 7], combinations: 4},
    {score: 13, plays: [2, 3, 7], combinations: 4},
];

for (const test of tests) {
    const actual = combinations(test.score, test.plays);
    assert.strictEqual(actual, test.combinations,
        `For score ${test.score}, and plays ${inspect(test.plays)}, ` +
        `expected combinations to be ${test.combinations}, but was ${actual}`);
}
