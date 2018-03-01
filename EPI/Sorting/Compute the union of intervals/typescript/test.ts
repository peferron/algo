import {Interval, union} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {intervals: Interval[], union: Interval[]}[] = [
    {
        intervals: [],
        union: []
    },
    {
        intervals: [
            {start: {value: 1, isClosed: false}, end: {value: 2, isClosed: false}},
        ],
        union: [
            {start: {value: 1, isClosed: false}, end: {value: 2, isClosed: false}},
        ]
    },
    {
        intervals: [
            {start: {value: 1, isClosed: false}, end: {value: 2, isClosed: false}},
            {start: {value: 2, isClosed: false}, end: {value: 4, isClosed: false}},
        ],
        union: [
            {start: {value: 1, isClosed: false}, end: {value: 2, isClosed: false}},
            {start: {value: 2, isClosed: false}, end: {value: 4, isClosed: false}},
        ]
    },
    {
        intervals: [
            {start: {value: 1, isClosed: false}, end: {value: 2, isClosed: true}},
            {start: {value: 2, isClosed: false}, end: {value: 4, isClosed: false}},
        ],
        union: [
            {start: {value: 1, isClosed: false}, end: {value: 4, isClosed: false}},
        ]
    },
    {
        intervals: [
            {start: {value: 1, isClosed: false}, end: {value: 2, isClosed: false}},
            {start: {value: 2, isClosed: true}, end: {value: 4, isClosed: false}},
        ],
        union: [
            {start: {value: 1, isClosed: false}, end: {value: 4, isClosed: false}},
        ]
    },
    {
        intervals: [
            {start: {value: 1, isClosed: false}, end: {value: 2, isClosed: true}},
            {start: {value: 2, isClosed: true}, end: {value: 4, isClosed: false}},
        ],
        union: [
            {start: {value: 1, isClosed: false}, end: {value: 4, isClosed: false}},
        ]
    },
    {
        intervals: [
            {start: {value: 1, isClosed: true}, end: {value: 2, isClosed: true}},
            {start: {value: 2, isClosed: false}, end: {value: 4, isClosed: true}},
        ],
        union: [
            {start: {value: 1, isClosed: true}, end: {value: 4, isClosed: true}},
        ]
    },
    {
        intervals: [
            {start: {value: 1, isClosed: false}, end: {value: 3, isClosed: false}},
            {start: {value: 5, isClosed: true}, end: {value: 6, isClosed: true}},
            {start: {value: 2, isClosed: false}, end: {value: 4, isClosed: false}},
        ],
        union: [
            {start: {value: 1, isClosed: false}, end: {value: 4, isClosed: false}},
            {start: {value: 5, isClosed: true}, end: {value: 6, isClosed: true}},
        ]
    },
    {
        intervals: [
            {start: {value: 2, isClosed: true}, end: {value: 4, isClosed: true}},
            {start: {value: 8, isClosed: true}, end: {value: 11, isClosed: false}},
            {start: {value: 13, isClosed: false}, end: {value: 15, isClosed: false}},
            {start: {value: 16, isClosed: false}, end: {value: 17, isClosed: false}},
            {start: {value: 1, isClosed: true}, end: {value: 1, isClosed: true}},
            {start: {value: 3, isClosed: true}, end: {value: 4, isClosed: false}},
            {start: {value: 7, isClosed: true}, end: {value: 8, isClosed: false}},
            {start: {value: 12, isClosed: false}, end: {value: 16, isClosed: true}},
            {start: {value: 0, isClosed: false}, end: {value: 3, isClosed: false}},
            {start: {value: 5, isClosed: true}, end: {value: 7, isClosed: false}},
            {start: {value: 9, isClosed: false}, end: {value: 11, isClosed: true}},
            {start: {value: 12, isClosed: true}, end: {value: 14, isClosed: true}},
        ],
        union: [
            {start: {value: 0, isClosed: false}, end: {value: 4, isClosed: true}},
            {start: {value: 5, isClosed: true}, end: {value: 11, isClosed: true}},
            {start: {value: 12, isClosed: true}, end: {value: 17, isClosed: false}},
        ]
    },
];

for (const test of tests) {
    const actual = union(test.intervals);
    assert.deepStrictEqual(actual, test.union, `For intervals ${inspect(test.intervals)}, ` +
        `expected union to be ${inspect(test.union)}, but was ${inspect(actual)}`);
}
