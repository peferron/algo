import {Polygon, minkowskiSum} from './minkowski_sum';

declare function require(name: String): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

interface Test {
    a: Polygon;
    b: Polygon;
    sum: Polygon;
}

const tests: Test[] = [
    {
        a: [
            {x: 0, y: 0},
            {x: 1, y: 1},
            {x: 0, y: 2},
        ],
        b: [
            {x: 0, y: 1},
            {x: 1, y: 0},
            {x: 1, y: 2},
        ],
        sum: [
            {x: 0, y: 1},
            {x: 1, y: 0},
            {x: 2, y: 1},
            {x: 2, y: 3},
            {x: 1, y: 4},
            {x: 0, y: 3},
        ]
    },
    {
        a: [
            {x: 0, y: 0},
            {x: 1, y: 1},
            {x: 0, y: 2},
        ],
        b: [
            {x: 0, y: 1},
            {x: 1, y: 0},
            {x: 1, y: 2},
        ],
        sum: [
            {x: 0, y: 1},
            {x: 1, y: 0},
            {x: 2, y: 1},
            {x: 2, y: 3},
            {x: 1, y: 4},
            {x: 0, y: 3},
        ]
    },
    {
        a: [
            {x: 1, y: 1},
            {x: 2, y: 2},
            {x: 1, y: 3},
        ],
        b: [
            {x: 3, y: 2},
            {x: 4, y: 2},
            {x: 4, y: 4},
            {x: 3, y: 4},
        ],
        sum: [
            {x: 4, y: 3},
            {x: 5, y: 3},
            {x: 6, y: 4},
            {x: 6, y: 6},
            {x: 5, y: 7},
            {x: 4, y: 7},
            {x: 4, y: 5}, // Optional
        ]
    },
    {
        a: [
            {x: 1, y: 1},
            {x: 2, y: 2},
            {x: 1, y: 3},
        ],
        b: [
            {x: 3, y: 2},
            {x: 5, y: 2},
            {x: 5, y: 4},
            {x: 4, y: 4},
        ],
        sum: [
            {x: 4, y: 3},
            {x: 6, y: 3},
            {x: 7, y: 4},
            {x: 7, y: 6},
            {x: 6, y: 7},
            {x: 5, y: 7},
            {x: 4, y: 5},
        ]
    },
    {
        a: [
            {x: -1, y: -1},
            {x: 1, y: -1},
            {x: 1, y: 2},
            {x: 0, y: 1},
        ],
        b: [
            {x: -2, y: 1},
            {x: -1, y: -2},
            {x: 2, y: 1},
            {x: 1, y: 2},
            {x: -1, y: 2},
        ],
        sum: [
            {x: -3, y: 0},
            {x: -2, y: -3},
            {x: 0, y: -3},
            {x: 3, y: 0},
            {x: 3, y: 3},
            {x: 2, y: 4},
            {x: 0, y: 4},
            {x: -1, y: 3},
            {x: -2, y: 2},
        ]
    }
];

function runTest(test: Test) {
    const sum = minkowskiSum(test.a, test.b);
    assert.deepStrictEqual(sum, test.sum,
        `For test polygons ${inspect(test.a)} and ${inspect(test.b)}, ` +
        `expected sum to be ${inspect(test.sum)}, but was ${inspect(sum)}`);
}

tests.forEach(runTest);
