import findDuplicateAndMissing from './12.12';

declare function require(name: string): any;
const assert = require('assert');

const tests: {values: number[], duplicate: number, missing: number}[] = [
    {
        values: [0, 0],
        duplicate: 0,
        missing: 1
    },
    {
        values: [4, 5, 2, 9, 7, 0, 1, 5, 6, 8],
        duplicate: 5,
        missing: 3
    },
    {
        values: [4, 5, 2, 9, 7, 0, 1, 3, 2, 8],
        duplicate: 2,
        missing: 6
    },
];

for (const test of tests) {
    const {duplicate, missing} = findDuplicateAndMissing(test.values);
    assert.deepStrictEqual([duplicate, missing], [test.duplicate, test.missing],
        `For values ${test.values}, ` +
        `expected duplicate to be ${test.duplicate} and missing to be ${test.missing}, ` +
        `but duplicate was ${duplicate} and missing was ${missing}`);
}
