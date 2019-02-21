import * as assert from 'assert';
import * as util from 'util';
import {Graph} from './adjacency_list';
import {Path, shortestPaths} from './dag_shortest_path';

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
    const actual = test.shortestPaths.map((_, start) => shortestPaths(test.graph, start));
    assert.deepStrictEqual(actual, test.shortestPaths, `For graph ${inspect(test.graph)}, ` +
        `expected shortest paths to be ${inspect(test.shortestPaths)}, but were ${inspect(actual)}`);
}

tests.forEach(runTest);
