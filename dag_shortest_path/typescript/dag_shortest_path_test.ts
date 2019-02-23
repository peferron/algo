import * as assert from 'assert';
import * as util from 'util';
import {Graph} from './adjacency_list';
import {Path, shortestPath} from './dag_shortest_path';

const inspect = (v: any) => util.inspect(v, {depth: null});

interface Test {
    graph: Graph;
    shortestPaths: Path[][];
}

const tests: Test[] = [
    {
        graph: {
            vertexCount: 1,
            directed: true,
            edges: [],
        },
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
        shortestPaths: [
            [[0],       [0, 1]],
            [undefined, [1]   ],
        ],
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
        shortestPaths: [
            [[0],       [0, 2, 1], [0, 2]   ],
            [undefined, [1],       undefined],
            [undefined, [2, 1],    [2]      ],
        ],
    },
];

function runTest(test: Test): void {
    for (let start = 0; start < test.graph.vertexCount; start += 1) {
        for (let end = 0; end < test.graph.vertexCount; end += 1) {
            const actual = shortestPath(test.graph, start, end);
            const expected = test.shortestPaths[start][end];
            assert.deepStrictEqual(actual, expected, `For graph ${inspect(test.graph)}, ` +
                `expected shortest path from ${start} to ${end} to be ${inspect(expected)}, ` +
                `but was ${inspect(actual)}`);
        }
    }
}

tests.forEach(runTest);
