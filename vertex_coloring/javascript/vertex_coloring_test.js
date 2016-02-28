const assert = require('assert');

import {getVertexColoring} from './vertex_coloring.js';

const tests = [
    {
        graph: {
            vertexCount: 0,
            edges: []
        },
        colors: 0
    },
    {
        graph: {
            vertexCount: 1,
            edges: []
        },
        colors: 1
    },
    {
        graph: {
            vertexCount: 2,
            edges: []
        },
        colors: 1
    },
    {
        graph: {
            vertexCount: 2,
            edges: [
                [0, 1]
            ]
        },
        colors: 2
    },
    {
        graph: {
            vertexCount: 3,
            edges: [
                [0, 1],
                [1, 2]
            ]
        },
        colors: 2
    },
    {
        graph: {
            vertexCount: 3,
            edges: [
                [0, 1], [0, 2],
                [1, 2]
            ]
        },
        colors: 3
    },
    {
        // Petersen graph: https://en.wikipedia.org/wiki/Petersen_graph
        graph: {
            vertexCount: 10,
            edges: [
                [0, 1], [0, 4], [0, 5],
                [1, 2], [1, 6],
                [2, 3], [2, 7],
                [3, 4], [3, 8],
                [4, 9],
                [5, 7], [5, 8],
                [6, 8], [6, 9],
                [7, 9]
            ]
        },
        colors: 3
    }
];

function isValidColoring(coloring, graph) {
    return graph.edges.every(([x, y]) =>
        coloring[x] >= 0 && coloring[y] >= 0 && coloring[x] !== coloring[y]
    );
}

function runTest(test) {
    const coloring = getVertexColoring(test.graph);
    assert(isValidColoring(coloring, test.graph));
    assert(new Set(coloring).size <= test.colors);
}

tests.forEach(runTest);

console.log('All tests OK.');
