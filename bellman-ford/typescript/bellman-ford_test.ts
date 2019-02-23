import * as assert from 'assert';
import * as util from 'util';
import {Graph, Path, shortestPath} from './bellman-ford';

const inspect = (v: any) => util.inspect(v, {depth: null});

interface Test {
    graph: Graph;
    hasNegativeCycle: boolean;
    shortestPaths?: Path[][];
}

const tests: Test[] = [
    {
        graph: {
            vertexCount: 1,
            directed: true,
            edges: [],
        },
        hasNegativeCycle: false,
        shortestPaths: [
            [[0]],
        ],
    },
    {
        graph: {
            vertexCount: 2,
            directed: true,
            edges: [],
        },
        hasNegativeCycle: false,
        shortestPaths: [
            [[0],       undefined],
            [undefined, [1]      ],
        ],
    },
    {
        graph: {
            vertexCount: 2,
            directed: true,
            edges: [
                {x: 0, y: 1, weight: 7},
            ],
        },
        hasNegativeCycle: false,
        shortestPaths: [
            [[0],       [0, 1]],
            [undefined, [1]   ],
        ],
    },
    {
        graph: {
            vertexCount: 2,
            directed: true,
            edges: [
                {x: 0, y: 1, weight: 3},
                {x: 1, y: 0, weight: -4},
            ],
        },
        hasNegativeCycle: true,
    },
    {
        graph: {
            vertexCount: 3,
            directed: true,
            edges: [
                {x: 0, y: 1, weight: 7},
                {x: 0, y: 2, weight: 10},
                {x: 2, y: 1, weight: -5},
            ],
        },
        hasNegativeCycle: false,
        shortestPaths: [
            [[0],       [0, 2, 1], [0, 2]   ],
            [undefined, [1],       undefined],
            [undefined, [2, 1],    [2]      ],
        ],
    },
    {
        // See an illustration of this example at: http://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm#Example
        graph: {
            vertexCount: 4,
            directed: true,
            edges: [
                {x: 0, y: 2, weight: -2},
                {x: 2, y: 3, weight: 2},
                {x: 3, y: 1, weight: -1},
                {x: 1, y: 0, weight: 4},
                {x: 1, y: 2, weight: 3},
            ],
        },
        hasNegativeCycle: false,
        shortestPaths: [
            [[0],          [0, 2, 3, 1], [0, 2],       [0, 2, 3]   ],
            [[1, 0],       [1],          [1, 0, 2],    [1, 0, 2, 3]],
            [[2, 3, 1, 0], [2, 3, 1],    [2],          [2, 3]      ],
            [[3, 1, 0],    [3, 1],       [3, 1, 0, 2], [3]         ],
        ],
    },
    {
        // See an illustration of this example at: https://www.geeksforgeeks.org/bellman-ford-algorithm-dp-23/
        graph: {
            vertexCount: 5,
            directed: true,
            edges: [
                {x: 0, y: 1, weight: -1},
                {x: 0, y: 2, weight: 4},
                {x: 1, y: 2, weight: 3},
                {x: 1, y: 3, weight: 2},
                {x: 1, y: 4, weight: 2},
                {x: 3, y: 1, weight: 1},
                {x: 3, y: 2, weight: 5},
                {x: 4, y: 3, weight: -3},
            ],
        },
        hasNegativeCycle: false,
        shortestPaths: [
            [[0],       [0, 1],    [0, 1, 2],    [0, 1, 4, 3], [0, 1, 4]],
            [undefined, [1],       [1, 2],       [1, 4, 3],    [1, 4]   ],
            [undefined, undefined, [2],          undefined,    undefined],
            [undefined, [3, 1],    [3, 1, 2],    [3],          [3, 1, 4]],
            [undefined, [4, 3, 1], [4, 3, 1, 2], [4, 3],       [4]      ],
        ],
    },
];

function runTest(test: Test): void {
    for (let start = 0; start < test.graph.vertexCount; start += 1) {
        for (let end = 0; end < test.graph.vertexCount; end += 1) {
            if (test.hasNegativeCycle) {
                assert.throws(() => shortestPath(test.graph, start, end),
                    new Error('This graph contains a negative cycle'));
            } else {
                const actual = shortestPath(test.graph, start, end);
                const expected = test.shortestPaths![start][end];
                assert.deepStrictEqual(actual, expected, `For graph ${inspect(test.graph)}, ` +
                    `expected shortest path from ${start} to ${end} to be ${inspect(expected)}, ` +
                    `but was ${inspect(actual)}`);
            }
        }
    }
}

tests.forEach(runTest);
