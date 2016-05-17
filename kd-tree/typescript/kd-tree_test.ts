import {Point, Range, KDTree} from './kd-tree';

declare function require(name: string): any;
const assert = require('assert');

interface NearestNeighborTest {
    points: Point[];
    nearestNeighbors: {input: Point, output: Point}[];
}

interface RangeTest {
    points: Point[];
    ranges: {input: Range, output: Point[]}[];
}

const nearestNeighborTests: NearestNeighborTest[] = [
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

const rangeTests: RangeTest[] = [
    {
        points: [
            [0, 0],
            [1, 2],
            [3, 1],
        ],
        ranges: [
            {
                input: {origin: [-1, -2], diagonal: [1, -1]},
                output: []
            },
            {
                input: {origin: [0, 0], diagonal: [1, 2]},
                output: [[1, 2], [0, 0]]
            },
            {
                input: {origin: [0.5, 0.5], diagonal: [3.5, 2.5]},
                output: [[1, 2], [3, 1]]
            },
            {
                input: {origin: [2.5, 0], diagonal: [4, 1.5]},
                output: [[3, 1]]
            },
            {
                input: {origin: [-1, -1], diagonal: [10, 10]},
                output: [[1, 2], [0, 0], [3, 1]]
            },
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
        ranges: [
            {
                input: {origin: [-1, 2, 0], diagonal: [3, 3, 1]},
                output: [[1, 3, 0]]
            },
            {
                input: {origin: [-1, 0, 5], diagonal: [10, 4, 8]},
                output: [[3, 1, 7], [5, 3, 6]]
            },
        ]
    }
];

function runNearestNeighborTest(test: NearestNeighborTest): void {
    const tree = new KDTree(test.points);
    for (const {input, output} of test.nearestNeighbors) {
        const actual = tree.nearestNeighbor(input);
        if (JSON.stringify(actual) !== JSON.stringify(output)) {
            throw new Error(`For points [${test.points.join(' ')}], expected nearest neighbor of ` +
                `${input} to be ${output}, but was ${actual}`);
        }
    }
}


function runRangeTest(test: RangeTest): void {
    const tree = new KDTree(test.points);
    for (const {input, output} of test.ranges) {
        const actual = tree.inRange(input);
        if (JSON.stringify(actual) !== JSON.stringify(output)) {
            throw new Error(`For points [${test.points.join(' ')}] and range ` +
                `{origin: ${input.origin}, diagonal: ${input.diagonal}}, expected points in ` +
                `range to be [${output.join(' ')}], but were [${actual.join(' ')}]`);
        }
    }
}

nearestNeighborTests.forEach(runNearestNeighborTest);
rangeTests.forEach(runRangeTest);
