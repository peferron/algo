import * as assert from 'assert';
import * as util from 'util';
import {Graph, AdjacencyMatrix} from './adjacency_matrix';
import shortestTour from './traveling_salesman_problem';

const inspect = (v: any) => util.inspect(v, {depth: null});

interface Test {
    graph: Graph;
    shortestTourDistance: number;
}

const tests: Test[] = [
    {
        graph: {
            vertexCount: 0,
            edges: [],
        },
        shortestTourDistance: 0,
    },
    {
        graph: {
            vertexCount: 1,
            edges: [],
        },
        shortestTourDistance: 0,
    },
    {
        graph: {
            vertexCount: 2,
            edges: [
                {x: 0, y: 1, distance: 1},
            ],
        },
        shortestTourDistance: 2,
    },
    {
        // Example taken from https://en.wikipedia.org/wiki/Travelling_salesman_problem#As_a_graph_problem
        // Furthest point insertion is unable to find the optimal solution; it needs 2-opt optimization.
        graph: {
            vertexCount: 4,
            edges: [
                {x: 0, y: 1, distance: 20},
                {x: 0, y: 2, distance: 42},
                {x: 0, y: 3, distance: 35},
                {x: 1, y: 2, distance: 30},
                {x: 1, y: 3, distance: 34},
                {x: 2, y: 3, distance: 12},
            ],
        },
        shortestTourDistance: 97, // 0, 1, 2, 3
    },
];

function runTest(test: Test): void {
    const tour = shortestTour(test.graph);

    // Verify that `actual` is a tour.
    assert.strictEqual(tour.length, test.graph.vertexCount,
        `${inspect(tour)} is not a tour of ${inspect(test.graph)}`);
    assert.strictEqual(new Set(tour).size, test.graph.vertexCount,
        `${inspect(tour)} is not a tour of ${inspect(test.graph)}`);

    // Verify that `actual` has the optimal distance.
    const actualDistance = new AdjacencyMatrix(test.graph).tourDistance(tour);
    assert.strictEqual(actualDistance, test.shortestTourDistance, `For graph ${inspect(test.graph)}, ` +
        `expected shortest tour to have distance ${test.shortestTourDistance}, ` +
        `but tour ${inspect(tour)} has distance ${actualDistance}`);
}

tests.forEach(runTest);
