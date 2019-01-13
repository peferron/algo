import * as assert from 'assert';
import {Edge, BipartiteGraph} from './adjacency_matrix';
import bipartiteMatching from './bipartite_matching';

interface Test {
    graph: BipartiteGraph;
    solution: Edge[];
}

const tests = [
    {
        graph: {
            directed: false,
            vertexCount: 2,
            flags: [true, false],
            edges: [
                [0, 1],
            ],
        },
        solution: [
            [0, 1],
        ],
    },
    {
        graph: {
            directed: false,
            vertexCount: 6,
            flags: [true, true, true, false, false, false],
            edges: [
                [0, 3], [0, 4],
                [1, 3],
                [2, 4], [2, 5],
            ],
        },
        solution: [
            [0, 4],
            [1, 3],
            [2, 5],
        ],
    },
];

function runTest(test: Test): void {
    assert.deepStrictEqual(test.solution, bipartiteMatching(test.graph));
}

tests.forEach(runTest);
