import {Edge, Graph, minimumFeedbackEdgeSet} from './minimum_feedback_edge_set';

declare function require(name: string): any;
const assert = require('assert');

interface Test {
    graph: Graph;
    set: Edge[];
}

const tests: Test[] = [
    {
        graph: {
            vertexCount: 3,
            edges: [
                [0, 1], [0, 2],
                [1, 2]
            ]
        },
        set: [] // No edges need to be cut.
    },
    {
        graph: {
            vertexCount: 3,
            edges: [
                [0, 1],
                [1, 2],
                [2, 0]
            ]
        },
        set: [
            [2, 0] // Could also be any of the two other edges.
        ]
    },
    {
        graph: {
            vertexCount: 4,
            edges: [
                [0, 2],
                [1, 0], [1, 3],
                [2, 1],
                [3, 2]
            ]
        },
        set: [
            [2, 1] // Could also be any of the two other edges.
        ]
    },
    {
        graph: {
            vertexCount: 4,
            edges: [
                [0, 2], [0, 3],
                [1, 0], [1, 3],
                [2, 1],
                [3, 2]
            ]
        },
        set: [
            // This is an example of the heuristic performing as badly as possible: half of the
            // edges are removed, while the optimal solution only removes one edge: [2, 1].
            [1, 0],
            [2, 1],
            [3, 2]
        ]
    }
];

function runTest(test: Test) {
    const set = minimumFeedbackEdgeSet(test.graph);
    assert.deepStrictEqual(set, test.set);
}

tests.forEach(runTest);
