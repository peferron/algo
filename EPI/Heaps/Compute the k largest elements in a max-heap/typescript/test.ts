import getLargest from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {heap: number[], count: number, largest: number[]}[] = [
    {heap: [], count: 0, largest: []},
    {heap: [0], count: 1, largest: [0]},
    {heap: [10, 7, 9, 3, 5, 2, 8], count: 5, largest: [10, 9, 8, 7, 5]},
];

for (const test of tests) {
    const actual = getLargest(test.heap, test.count);
    assert.deepStrictEqual(actual, test.largest, `For max-heap ${inspect(test.heap)}, ` +
        `expected ${test.count} largest elements to be ${inspect(test.largest)}, ` +
        `but were ${inspect(actual)}`);
}
