import {Point, equal, KDTree} from './kd-tree';

declare function require(name: string): any;
const assert = require('assert');

interface Test {
    points: Point[];
    nearestNeighbors: {input: Point, output: Point}[];
}

const tests: Test[] = [
    {
        points: [
            [0, 0],
            [1, 2],
            [3, 1],
        ],
        nearestNeighbors: [
            {input: [0, 1], output: [0, 0]},
            {input: [0, 2], output: [1, 2]},
            {input: [2, 3], output: [1, 2]},
            {input: [4, 3], output: [3, 1]},
            {input: [4, 3], output: [3, 1]},
            {input: [2, -2], output: [0, 0]},
            {input: [3, -1], output: [3, 1]},
        ]
    },
    {
        points: [
            [0, 0, 0],
            [1, 3, 0],
            [2, 0, 0],
            [3, 1, 7],
            [5, 3, 6],
            [5, 5, 5],
        ],
        nearestNeighbors: [
            {input: [2, 0, 0], output: [2, 0, 0]},
            {input: [2, 1, 1], output: [2, 0, 0]},
            {input: [3, 1, 1], output: [2, 0, 0]},
            {input: [3, 1, 1], output: [2, 0, 0]},
            {input: [1, 2, 1], output: [1, 3, 0]},
            {input: [3, 3, 0], output: [1, 3, 0]},
            {input: [3, 5, 5], output: [5, 5, 5]},
            {input: [1, 2, 7], output: [3, 1, 7]},
            {input: [4, 2, 6], output: [5, 3, 6]},
            {input: [5, 4, 5], output: [5, 5, 5]},
            {input: [4, 4, 11], output: [3, 1, 7]},
        ]
    }
];

function runTest(test: Test): void {
    const tree = new KDTree(test.points);
    for (const {input, output} of test.nearestNeighbors) {
        const actual = tree.nearestNeighbor(input);
        if (!equal(actual, output)) {
            throw new Error(`For points ${test.points.join(' ')}, expected nearest neighbor of ` +
                `${input} to be ${output}, but was ${actual}`);
        }
    }
}

tests.forEach(runTest);
