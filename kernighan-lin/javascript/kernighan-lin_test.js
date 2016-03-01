const assert = require('assert');

import {bisect} from './kernighan-lin.js';

const tests = [
    {
        graph: {
            vertexCount: 0,
            edges: []
        },
        subsets: [
            [],
            []
        ]
    },
    {
        graph: {
            vertexCount: 1,
            edges: []
        },
        subsets: [
            [],
            [0]
        ]
    },
    {
        graph: {
            vertexCount: 3,
            edges: []
        },
        subsets: [ // That's only one of three correct answers.
            [0, 1],
            [2]
        ]
    },
    {
        graph: {
            vertexCount: 3,
            edges: [
                [0, 1]
            ]
        },
        subsets: [
            [0, 1],
            [2]
        ]
    },
    {
        graph: {
            vertexCount: 3,
            edges: [
                [1, 2]
            ]
        },
        subsets: [
            [0],
            [1, 2]
        ]
    },
    {
        graph: {
            vertexCount: 4,
            edges: [
                [0, 1], [0, 2], [0, 3],
                [1, 2]
            ]
        },
        subsets: [
            [0, 3],
            [1, 2]
        ]
    },
    {
        graph: {
            vertexCount: 5,
            edges: [
                [0, 3], [0, 4],
                [1, 2], [1, 4],
                [3, 4]
            ]
        },
        subsets: [
            [0, 3, 4],
            [1, 2]
        ]
    },
];

function sort(subsets) {
    // Sort vertices inside each subset.
    subsets.forEach(subset => subset.sort((x, y) => x - y));
    // Sort subsets based on their first vertex. Empty subsets go first.
    return subsets.sort((a, b) => !a.length ? -1 : !b.length ? 1 : a[0] - b[0]);
}

function runTest(test) {
    assert.deepEqual(sort(bisect(test.graph)), test.subsets);
}

tests.forEach(runTest);

console.log('All tests OK.');
