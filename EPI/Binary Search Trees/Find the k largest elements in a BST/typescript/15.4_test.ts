import {Node, getLargest} from './15.4';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {bst: Node, count: number, largest: number[]}[] = [
    {
        bst: {value: 5},
        count: 1,
        largest: [5]
    },
    {
        bst: {value: 5},
        count: 2,
        largest: [5]
    },
    {
        bst: {
            value: 5,
            left: {value: 3},
            right: {
                value: 8,
                left: {
                    value: 6,
                    right: {value: 7}
                }
            }
        },
        count: 2,
        largest: [8, 7]
    },
    {
        bst: {
            value: 5,
            left: {
                value: 3,
                right: {value: 4}
            },
            right: {value: 6}
        },
        count: 3,
        largest: [6, 5, 4]
    }
];

for (const test of tests) {
    const actual = getLargest(test.bst, test.count);
    assert.deepStrictEqual(actual, test.largest, `For BST ${inspect(test.bst)}, ` +
        `expected ${test.count} largest elements to be ${test.largest}, but were ${actual}`);
}
