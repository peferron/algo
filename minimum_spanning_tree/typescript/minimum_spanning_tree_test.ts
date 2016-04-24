import {Graph, Edge} from './adjacency_list';
import minimumSpanningTreeEdges from './minimum_spanning_tree';

declare function require(name: string): any;
const assert = require('assert');

interface Test {
    graph: Graph;
    mstEdges: Edge[];
}

const tests: Test[] = [
    {
        graph: {
            vertexCount: 0,
            directed: true,
            edges: []
        },
        mstEdges: []
    },
    {
        graph: {
            vertexCount: 3,
            directed: true,
            edges: [
                {x: 0, y: 1, weight: 1},
                {x: 0, y: 2, weight: 3},
                {x: 1, y: 2, weight: 2}
            ]
        },
        mstEdges: [
            {x: 0, y: 1, weight: 1},
            {x: 1, y: 2, weight: 2}
        ]
    },
    {
        // See an illustration of this example at:
        // http://en.wikipedia.org/wiki/Bor%C5%AFvka%27s_algorithm#Example
        graph: {
            vertexCount: 7,
            directed: true,
            edges: [
                {x: 0, y: 1, weight: 7},
                {x: 0, y: 3, weight: 4},
                {x: 1, y: 2, weight: 11},
                {x: 1, y: 3, weight: 9},
                {x: 1, y: 4, weight: 10},
                {x: 2, y: 4, weight: 5},
                {x: 3, y: 4, weight: 15},
                {x: 3, y: 5, weight: 6},
                {x: 4, y: 5, weight: 12},
                {x: 4, y: 6, weight: 8},
                {x: 5, y: 6, weight: 13}
            ]
        },
        mstEdges: [
            {x: 0, y: 1, weight: 7},
            {x: 0, y: 3, weight: 4},
            {x: 1, y: 4, weight: 10},
            {x: 2, y: 4, weight: 5},
            {x: 3, y: 5, weight: 6},
            {x: 4, y: 6, weight: 8}
        ]
    }
];

function runTest(test: Test): void {
    const mstEdges = minimumSpanningTreeEdges(test.graph).sort(compareEdges);
    assert.deepEqual(mstEdges, test.mstEdges);
}

function compareEdges(a: Edge, b: Edge): number {
    if (a.x !== b.x) {
        return a.x - b.x;
    }
    return a.y - b.y;
}

tests.forEach(runTest);
