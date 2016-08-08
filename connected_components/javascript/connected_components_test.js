const assert = require('assert');

import {connectedComponents} from './connected_components.js';

const tests = [
    {
        graph: {
            vertexCount: 0,
            directed: false,
            edges: []
        },
        components: []
    },
    {
        graph: {
            vertexCount: 1,
            directed: false,
            edges: []
        },
        components: [0]
    },
    {
        graph: {
            vertexCount: 2,
            directed: false,
            edges: []
        },
        components: [0, 1]
    },
    {
        graph: {
            vertexCount: 2,
            directed: false,
            edges: [
                [0, 1]
            ]
        },
        components: [0, 0]
    },
    {
        graph: {
            vertexCount: 7,
            directed: false,
            edges: [
                [0, 2],
                [2, 3],
                [2, 5],
                [1, 4]
            ]
        },
        components: [0, 1, 0, 0, 1, 0, 2]
    }
];

function runTest(test) {
    assert.deepStrictEqual(connectedComponents(test.graph), test.components);
}

tests.forEach(runTest);
