const assert = require('assert');

import {bisect} from './graph_partition.js';

const tests = [
    {
        graph: {
            vertexCount: 0,
            edges: []
        },
        subsets: []
    },
    {
        graph: {
            vertexCount: 1,
            edges: []
        },
        subsets: [0]
    },
    {
        graph: {
            vertexCount: 3,
            edges: [
                [0, 1]
            ]
        },
        subsets: [0, 0, 1]
    },
    {
        graph: {
            vertexCount: 3,
            edges: [
                [1, 2]
            ]
        },
        subsets: [1, 0, 0]
    },
    {
        graph: {
            vertexCount: 4,
            edges: [
                [0, 1], [0, 2], [0, 3],
                [1, 2]
            ]
        },
        subsets: [1, 0, 0, 1]
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
        subsets: [1, 0, 0, 1, 1]
    }
];

function runTest(test) {
    assert.deepEqual(bisect(test.graph), test.subsets);
}

tests.forEach(runTest);
