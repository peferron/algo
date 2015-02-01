/// <reference path="minimum_spanning_tree.ts"/>

declare function require(name: string): any;
let assert = require('assert');

import Graph = minimum_spanning_tree.Graph;
import Edge = minimum_spanning_tree.Edge

interface Test {
    graph: Graph;
    mstEdges: Edge[];
}

let tests: Test[] = [
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
        // See http://en.wikipedia.org/wiki/Bor%C5%AFvka%27s_algorithm#Example for an illustation of
        // this example.
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
    let mstEdges = minimum_spanning_tree.edges(test.graph).sort(compareEdges);
    assert.deepEqual(mstEdges, test.mstEdges);
}

function compareEdges(a: Edge, b: Edge): number {
    if (a.x !== b.x) {
        return a.x - b.x;
    }
    return a.y - b.y;
}

tests.forEach(runTest);

console.log('All tests OK.');
