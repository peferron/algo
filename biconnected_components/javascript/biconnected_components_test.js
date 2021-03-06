import assert from 'assert';
import articulations from './biconnected_components';

const tests = [
    {
        graph: {
            vertexCount: 0,
            directed: false,
            edges: [],
        },
        articulations: [],
    },
    {
        graph: {
            vertexCount: 1,
            directed: false,
            edges: [],
        },
        articulations: [],
    },
    {
        graph: {
            vertexCount: 2,
            directed: false,
            edges: [],
        },
        articulations: [],
    },
    {
        graph: {
            vertexCount: 2,
            directed: false,
            edges: [
                [0, 1],
            ],
        },
        articulations: [],
    },
    {
        graph: {
            vertexCount: 3,
            directed: false,
            edges: [
                [0, 1],
                [1, 2],
            ],
        },
        articulations: [1],
    },
    {
        graph: {
            vertexCount: 3,
            directed: false,
            edges: [
                [0, 1],
                [0, 2],
                [1, 2],
            ],
        },
        articulations: [],
    },
    {
        graph: {
            vertexCount: 4,
            directed: false,
            edges: [
                [0, 1],
                [0, 2],
                [1, 2],
                [2, 3],
            ],
        },
        articulations: [2],
    },
    {
        graph: {
            vertexCount: 5,
            directed: false,
            edges: [
                [0, 1],
                [1, 2],
                [1, 3],
                [2, 3],
                [2, 4],
                [3, 4],
            ],
        },
        articulations: [1],
    },
    {
        // See an illustration of this example at:
        // http://www.cs.cmu.edu/~avrim/451f12/lectures/biconnected.pdf
        graph: {
            vertexCount: 10,
            directed: false,
            edges: [
                [0, 1],
                [0, 6],
                [1, 2],
                [1, 3],
                [1, 5],
                [2, 3],
                [2, 4],
                [3, 4],
                [5, 6],
                [5, 7],
                [5, 8],
                [7, 8],
                [8, 9],
            ],
        },
        articulations: [1, 5, 8],
    },
];

function runTest(test) {
    const sorted = articulations(test.graph).sort((a, b) => a - b);
    assert.deepStrictEqual(sorted, test.articulations);
}

tests.forEach(runTest);
