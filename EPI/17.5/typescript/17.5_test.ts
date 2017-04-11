import contains from './17.5';

declare function require(name: String): any;
const assert = require('assert');

const tests = [
    {
        grid: [],
        subTests: [
            {sequence: [], contained: true},
            {sequence: [0], contained: false},
        ]
    },
    {
        grid: [
            [0],
        ],
        subTests: [
            {sequence: [], contained: true},
            {sequence: [0], contained: true},
            {sequence: [0, 1], contained: false},
            {sequence: [1], contained: false},
            {sequence: [1, 0], contained: false},
        ]
    },
    {
        grid: [
            [1, 2, 3],
            [3, 4, 5],
            [5, 6, 7],
        ],
        subTests: [
            {sequence: [1, 3, 4, 6], contained: true},
            {sequence: [1, 2, 3, 4], contained: false},
            {sequence: [1, 3, 4, 6, 4, 5, 3, 2, 1, 3, 5, 3, 1], contained: true},
            {sequence: [1, 3, 4, 6, 4, 5, 3, 2, 1, 3, 5, 3, 2], contained: false},
        ]
    },
];

for (const test of tests) {
    for (const subTest of test.subTests) {
        const actual = contains(test.grid, subTest.sequence)
        assert.strictEqual(actual, subTest.contained,
            `For grid ${test.grid} and sequence ${subTest.sequence}, ` +
            `expected contained to be ${subTest.contained}, but was ${actual}`);
    }
}
