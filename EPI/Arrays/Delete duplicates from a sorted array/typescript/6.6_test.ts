import removeDuplicates from './6.6';

declare function require(name: string): any;
const assert = require('assert');

const tests: {before: number[], after: number[]}[] = [
    {
        before: [],
        after: []
    },
    {
        before: [1],
        after: [1]
    },
    {
        before: [1, 1],
        after: [1, ]
    },
    {
        before: [1, 2, 3],
        after: [1, 2, 3]
    },
    {
        before: [1, 2, 2, 3],
        after: [1, 2, 3]
    },
    {
        before: [-1, -1, 1, 1, 2, 3, 3, 4, 5, 8, 8],
        after: [-1, 1, 2, 3, 4, 5, 8]
    },
];

for (const test of tests) {
    const actualValues = [...test.before];
    const actualLength = removeDuplicates(actualValues);
    assert.strictEqual(actualLength, test.after.length);
    assert.deepStrictEqual(actualValues.slice(0, actualLength), test.after);
}
