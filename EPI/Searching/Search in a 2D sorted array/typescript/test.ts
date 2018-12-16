import contains from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {matrix: number[][], value: number, contains: boolean}[] = [
    {
        matrix: [],
        value: 0,
        contains: false
    },
    {
        matrix: [
            [],
        ],
        value: 0,
        contains: false
    },
    {
        matrix: [
            [],
            [],
        ],
        value: 0,
        contains: false
    },
    {
        matrix: [
            [0, 3, 6],
        ],
        value: -1,
        contains: false
    },
    {
        matrix: [
            [0, 3, 6],
        ],
        value: 0,
        contains: true
    },
    {
        matrix: [
            [0, 3, 6],
        ],
        value: 2,
        contains: false
    },
    {
        matrix: [
            [0, 3, 6],
        ],
        value: 3,
        contains: true
    },
    {
        matrix: [
            [0, 3, 6],
        ],
        value: 6,
        contains: true
    },
    {
        matrix: [
            [0, 3, 6],
        ],
        value: 10,
        contains: false
    },
    {
        matrix: [
            [0],
            [3],
            [6],
        ],
        value: -1,
        contains: false
    },
    {
        matrix: [
            [0],
            [3],
            [6],
        ],
        value: 0,
        contains: true
    },
    {
        matrix: [
            [0],
            [3],
            [6],
        ],
        value: 2,
        contains: false
    },
    {
        matrix: [
            [0],
            [3],
            [6],
        ],
        value: 3,
        contains: true
    },
    {
        matrix: [
            [0],
            [3],
            [6],
        ],
        value: 6,
        contains: true
    },
    {
        matrix: [
            [0],
            [3],
            [6],
        ],
        value: 10,
        contains: false
    },
    {
        matrix: [
            [0, 1, 5, 7],
            [3, 4, 5, 8],
            [6, 6, 9, 10],
        ],
        value: -1,
        contains: false
    },
    {
        matrix: [
            [0, 1, 5, 7],
            [3, 4, 5, 8],
            [6, 6, 9, 10],
        ],
        value: 4,
        contains: true
    },
    {
        matrix: [
            [0, 1, 5, 7],
            [3, 5, 5, 8],
            [4, 5, 9, 9],
        ],
        value: 6,
        contains: false
    },
    {
        matrix: [
            [0, 1, 5, 7],
            [3, 5, 5, 8],
            [4, 5, 9, 9],
        ],
        value: 10,
        contains: false
    },
];

for (const test of tests) {
    const actual = contains(test.matrix, test.value);
    assert.strictEqual(actual, test.contains,
        `For matrix ${inspect(test.matrix)} and value ${test.value}, ` +
        `expected contains to be ${test.contains}, but was ${actual}`);
}
