import {Graph} from './adjacency_list';
import sort from './topological_sorting';

declare function require(name: string): any;
const assert = require('assert');

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
                {x: 5, y: 4}
            ]
        },
        sorts: [
            [6, 0, 1, 2, 5, 4, 3]
        ]
    }
];

function runTest(test: Test): void {
    assert(contains(test.sorts, sort(test.graph)));
}

function contains(list: number[][], item: number[]): boolean {
    return list.some(listItem => deepEqual(listItem, item));
}

function deepEqual(a: any, b: any): boolean {
    try {
        assert.deepEqual(a, b);
        return true;
    } catch (e) {
        // Empty on purpose.
    }
    return false;
}

tests.forEach(runTest);

console.log('All tests OK.');
