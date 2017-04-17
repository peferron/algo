import medians from './11.5';

declare function require(name: String): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {values: number[], medians: number[]}[] = [
    // {
    //     values: [],
    //     medians: []
    // },
    // {
    //     values: [1],
    //     medians: [1]
    // },
    {
        values: [1, 0, 3, 5, 2, 0, 1],
        medians: [1, 0.5, 1, 2, 2, 1.5, 1]
    },
];

for (const test of tests) {
    const actual = medians(test.values);
    assert.deepStrictEqual(actual, test.medians, `For values ${inspect(test.values)}, ` +
        `expected medians to be ${test.medians}, but were ${actual}`);
}
