import {Graph, Vertex, getShortestPath} from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

interface SubTest {
    from: Vertex;
    to: Vertex;
    shortestPath: Vertex[] | undefined;
}

const tests: {graph: Graph, subTests: SubTest[]}[] = [
    {
        graph: {
            vertexCount: 1,
            directed: false,
            edges: []
        },
        subTests: [
            {from: 0, to: 0, shortestPath: [0]},
        ]
    },
    {
        graph: {
            vertexCount: 2,
            directed: false,
            edges: []
        },
        subTests: [
            {from: 0, to: 1, shortestPath: undefined},
        ]
    },
    {
        graph: {
            vertexCount: 2,
            directed: false,
            edges: [
                {from: 0, to: 1, distance: 7},
            ]
        },
        subTests: [
            {from: 0, to: 1, shortestPath: [0, 1]},
        ]
    },
    {
        graph: {
            vertexCount: 2,
            directed: true,
            edges: [
                {from: 0, to: 1, distance: 7},
            ]
        },
        subTests: [
            {from: 0, to: 1, shortestPath: [0, 1]},
            {from: 1, to: 0, shortestPath: undefined},
        ]
    },
    {
        graph: {
            vertexCount: 3,
            directed: true,
            edges: [
                {from: 0, to: 2, distance: 5},
                {from: 0, to: 1, distance: 2},
                {from: 1, to: 2, distance: 3},
            ]
        },
        subTests: [
            {from: 0, to: 2, shortestPath: [0, 2]},
        ]
    },
    {
        graph: {
            vertexCount: 4,
            directed: true,
            edges: [
                {from: 0, to: 3, distance: 11},
                {from: 0, to: 1, distance: 5},
                {from: 1, to: 2, distance: 3},
                {from: 2, to: 3, distance: 2},
                {from: 1, to: 3, distance: 5},
            ]
        },
        subTests: [
            {from: 1, to: 3, shortestPath: [1, 3]},
            {from: 0, to: 3, shortestPath: [0, 1, 3]},
        ]
    },
    {
        graph: {
            vertexCount: 6,
            directed: false,
            edges: [
                {from: 0, to: 1, distance: 7},
                {from: 0, to: 2, distance: 9},
                {from: 0, to: 5, distance: 14},
                {from: 1, to: 2, distance: 10},
                {from: 1, to: 3, distance: 15},
                {from: 2, to: 3, distance: 11},
                {from: 2, to: 5, distance: 2},
                {from: 3, to: 4, distance: 6},
                {from: 4, to: 5, distance: 9},
            ]
        },
        subTests: [
            // See an animated illustration of this example at:
            // http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
            {from: 0, to: 4, shortestPath: [0, 2, 5, 4]},
            {from: 1, to: 4, shortestPath: [1, 3, 4]},
        ]
    },
];

for (const test of tests) {
    for (const subTest of test.subTests) {
        const actual = getShortestPath(test.graph, subTest.from, subTest.to);
        assert.deepStrictEqual(actual, subTest.shortestPath, `For graph ${inspect(test.graph)}, ` +
            `expected shortest path from ${subTest.from} to ${subTest.to} ` +
            `to be ${subTest.shortestPath}, but was ${actual}`);
    }
}
