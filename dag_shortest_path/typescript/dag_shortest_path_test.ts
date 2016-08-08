import {Graph} from './adjacency_list';
import shortestPath from './dag_shortest_path';

declare function require(name: string): any;
const assert = require('assert');

interface Test {
    graph: Graph;
    problems: Problem[];
}

interface Problem {
    start: number;
    end: number;
    solutions: number[][];
}

const tests: Test[] = [
    {
        graph: {
            vertexCount: 1,
            directed: true,
            edges: [],
        },
        problems: [
            {start: 0, end: 0, solutions: [[0]]}
        ]
    },
    {
        graph: {
            vertexCount: 2,
            directed: true,
            edges: []
        },
        problems: [
            {start: 0, end: 1, solutions: []}
        ]
    },
    {
        graph: {
            vertexCount: 2,
            directed: true,
            edges: [
                {x: 0, y: 1, weight: 7},
            ]
        },
        problems: [
            {start: 0, end: 1, solutions: [[0, 1]]},
            {start: 1, end: 0, solutions: []}
        ]
    },
    {
        graph: {
            vertexCount: 3,
            directed: true,
            edges: [
                {x: 0, y: 1, weight: 7},
                {x: 0, y: 2, weight: 10},
                {x: 2, y: 1, weight: -5},
            ]
        },
        problems: [
            {start: 0, end: 1, solutions: [[0, 2, 1]]},
            {start: 0, end: 2, solutions: [[0, 2]]},
            {start: 1, end: 0, solutions: []},
            {start: 1, end: 2, solutions: []},
            {start: 2, end: 0, solutions: []},
            {start: 2, end: 1, solutions: [[2, 1]]},
        ]
    }
];

function runTest(test: Test): void {
    test.problems.forEach(problem => {
        const solution = shortestPath(test.graph, problem.start, problem.end);
        if (solution) {
            assert(contains(problem.solutions, solution));
        } else {
            assert(!problem.solutions.length);
        }
    });
}

function contains(list: number[][], item: number[]): boolean {
    return list.some(listItem => deepEqual(listItem, item));
}

function deepEqual(a: any, b: any): boolean {
    try {
        assert.deepStrictEqual(a, b);
        return true;
    } catch (e) {
        // Empty on purpose.
    }
    return false;
}

tests.forEach(runTest);
