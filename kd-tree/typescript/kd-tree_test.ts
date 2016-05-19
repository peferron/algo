import {Point, Range, KDTree} from './kd-tree';
import {Region, KDRegionTree} from './kd-region-tree';

declare function require(name: string): any;
const inspect = require('util').inspect;

interface NearestNeighborTest {
    points: Point[];
    cases: {input: Point, output: Point}[];
}

const nearestNeighborTests: NearestNeighborTest[] = [
    {
        points: [
            [0, 0],
            [1, 2],
            [3, 1],
        ],
        cases: [
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
        cases: [
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

for (const test of nearestNeighborTests) {
    const tree = new KDTree(test.points);
    for (const {input, output} of test.cases) {
        const actual = tree.nearestNeighbor(input);
        if (JSON.stringify(actual) !== JSON.stringify(output)) {
            throw new Error(`For points ${inspect(test.points)}, ` +
                `expected nearest neighbor of ${inspect(input)} to be ${inspect(output)}, ` +
                `but was ${inspect(actual)}`);
        }
    }
}

interface RangeTest {
    points: Point[];
    cases: {input: Range, output: Point[]}[];
}

const rangeTests: RangeTest[] = [
    {
        points: [
            [0, 0],
            [1, 2],
            [3, 1],
        ],
        cases: [
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
        cases: [
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

for (const test of rangeTests) {
    const tree = new KDTree(test.points);
    for (const {input, output} of test.cases) {
        const actual = tree.inRange(input);
        if (JSON.stringify(actual) !== JSON.stringify(output)) {
            throw new Error(`For points ${inspect(test.points)}, ` +
                `expected points in range ${inspect(input)} to be ${inspect(output)}, ` +
                `but were ${inspect(actual)}`);
        }
    }
}

interface RegionTest {
    points: Point[];
    regions: Region[];
    cases: {input: Point, output: Region}[];
}

const regionTests: RegionTest[] = [
    {
        points: [
            [0, 0],
            [1, 2],
            [3, 1],
        ],
        regions: [
            [[0, 0], [1, 2], [3, 1]],
        ],
        cases: [
            {
                input: [1, 1],
                output: [[0, 0], [1, 2], [3, 1]]
            },
            {
                input: [2, 2],
                output: undefined
            },
            {
                input: [2.5, 1.5],
                output: undefined
            },
            {
                // Points on a right-side boundary edge are considered outside.
                input: [2, 1.5],
                output: undefined
            },
            {
                // Points on a left-side boundary edge are considered inside.
                input: [0.5, 1],
                output: [[0, 0], [1, 2], [3, 1]]
            },
        ]
    },
    {
        points: [
            [0, 2],
            [3, 4],
            [4, 0],
            [5, 7],
            [6, 5],
            [8, 1],
            [9, 6],
            [11, 3],
        ],
        regions: [
            [[0, 2], [3, 4], [4, 0], [6, 5], [5, 7]],
            [[4, 0], [8, 1], [6, 5]],
            [[8, 1], [11, 3], [9, 6], [6, 5]],
        ],
        cases: [
            {
                input: [2, 3],
                output: undefined
            },
            {
                input: [2, 3.5],
                output: [[0, 2], [3, 4], [4, 0], [6, 5], [5, 7]]
            },
            {
                input: [4, 1],
                output: [[0, 2], [3, 4], [4, 0], [6, 5], [5, 7]]
            },
            {
                input: [5, 5],
                output: [[0, 2], [3, 4], [4, 0], [6, 5], [5, 7]]
            },
            {
                input: [4.5, 1],
                output: [[4, 0], [8, 1], [6, 5]]
            },
            {
                input: [7, 0.5],
                output: undefined
            },
            {
                input: [7, 2],
                output: [[4, 0], [8, 1], [6, 5]]
            },
            {
                input: [7, 4],
                output: [[8, 1], [11, 3], [9, 6], [6, 5]]
            },
            {
                input: [10, 4],
                output: [[8, 1], [11, 3], [9, 6], [6, 5]]
            },
            {
                input: [10, 5],
                output: undefined
            },
        ]
    },
];

for (const test of regionTests) {
    const tree = new KDRegionTree(test.points, test.regions);
    for (const {input, output} of test.cases) {
        const actual = tree.region(input);
        if (JSON.stringify(actual) !== JSON.stringify(output)) {
            throw new Error(`For points ${inspect(test.points)} ` +
                `and regions ${inspect(test.regions)}, ` +
                `expected region of point ${inspect(input)} to be ${inspect(output)}, ` +
                `but was ${inspect(actual)}`);
        }
    }
}
