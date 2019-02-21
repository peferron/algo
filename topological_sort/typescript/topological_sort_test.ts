import * as assert from 'assert';
import {Graph} from './adjacency_list';
import {sort, shortestPaths} from './topological_sort';

interface Test {
    graph: Graph;
    sorts: number[][];
    shortestPaths: {start: number, paths: (number[] | undefined)[]}[];
}

const tests: Test[] = [
    {
        graph: {
            vertexCount: 7,
            directed: true,
            edges: [
                {x: 0, y: 1, weight: 7},
                {x: 1, y: 3, weight: 5},
                {x: 1, y: 2, weight: 0},
                {x: 2, y: 4, weight: 3},
                {x: 0, y: 2, weight: 6},
                {x: 4, y: 3, weight: 1},
                {x: 6, y: 0, weight: 3},
                {x: 6, y: 5, weight: 2},
                {x: 2, y: 5, weight: 1},
                {x: 5, y: 4, weight: 2},
            ],
        },
        sorts: [
            [6, 0, 1, 2, 5, 4, 3],
        ],
        shortestPaths: [
            {
                start: 2,
                paths: [
                    undefined,
                    undefined,
                    [2],
                    [2, 4, 3],
                    [2, 4],
                    [2, 5],
                    undefined,
                ],
            },
            {
                start: 6,
                paths: [
                    [6, 0],
                    [6, 0, 1],
                    [6, 0, 2],
                    [6, 5, 4, 3],
                    [6, 5, 4],
                    [6, 5],
                    [6],
                ],
            },
        ],
    },
];

const deepEqual = (a: any, b: any) => {
    try {
        assert.deepStrictEqual(a, b);
        return true;
    } catch (e) {
        return false;
    }
};

const contains = (list: number[][], item: number[]) =>
    list.some(listItem => deepEqual(listItem, item));

function runTest(test: Test): void {
    assert.ok(contains(test.sorts, sort(test.graph)));

    for (const shortestPathsTest of test.shortestPaths) {
        const paths = shortestPaths(test.graph, shortestPathsTest.start);
        assert.deepStrictEqual(paths, shortestPathsTest.paths);
    }
}

tests.forEach(runTest);
