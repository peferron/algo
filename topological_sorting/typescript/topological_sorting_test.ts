import * as assert from 'assert';
import {Graph} from './adjacency_list';
import sort from './topological_sorting';

interface Test {
    graph: Graph;
    sorts: number[][];
}

const tests: Test[] = [
    {
        graph: {
            vertexCount: 7,
            directed: true,
            edges: [
                {x: 0, y: 1},
                {x: 1, y: 3},
                {x: 1, y: 2},
                {x: 2, y: 4},
                {x: 0, y: 2},
                {x: 4, y: 3},
                {x: 6, y: 0},
                {x: 6, y: 5},
                {x: 2, y: 5},
                {x: 5, y: 4},
            ],
        },
        sorts: [
            [6, 0, 1, 2, 5, 4, 3],
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
}

tests.forEach(runTest);
