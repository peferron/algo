import indexOfMin from './12.4';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {array: number[], indexOfMin: number}[] = [
    {
        array: [0],
        indexOfMin: 0
    },
    {
        array: [0, 1, 2, 3, 4],
        indexOfMin: 0
    },
    {
        array: [1, 2, 3, 4, 0],
        indexOfMin: 4
    },
    {
        array: [3, 4, 0, 1, 2],
        indexOfMin: 2
    },
];

for (const test of tests) {
    const actual = indexOfMin(test.array);
    assert.strictEqual(actual, test.indexOfMin, `For array ${inspect(test.array)}, ` +
        `expected indexOfMin to be ${test.indexOfMin}, but was ${actual}`);
}
