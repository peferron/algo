import {triangulate, partition} from './polygon_partitioning';

const inspect = require('util').inspect;

const triangulateTests = [
    {
        polygon: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 1, y: 1},
            {x: 0, y: 1}
        ],
        diagonals: [
            [{x: 0, y: 1}, {x: 1, y: 0}]
        ]
    },
    {
        polygon: [
            {x: 0, y: 0},
            {x: 2, y: 0},
            {x: 3, y: 2},
            {x: 4, y: 1},
            {x: 3, y: 0},
            {x: 5, y: 0},
            {x: 6, y: 1},
            {x: 2, y: 5},
            {x: 0, y: 3}
        ],
        diagonals: [
            [{x: 0, y: 3}, {x: 2, y: 0}],
            [{x: 0, y: 3}, {x: 3, y: 2}],
            [{x: 2, y: 5}, {x: 3, y: 2}],
            [{x: 4, y: 1}, {x: 5, y: 0}],
            [{x: 4, y: 1}, {x: 6, y: 1}],
            [{x: 4, y: 1}, {x: 2, y: 5}]
        ]
    }
];

for (const test of triangulateTests) {
    const actual = triangulate(test.polygon);
    if (JSON.stringify(actual) !== JSON.stringify(test.diagonals)) {
        throw new Error(`For polygon ${inspect(test.polygon)}, ` +
            `expected triangulation diagonals to be ${inspect(test.diagonals)}, ` +
            `but were ${inspect(actual)}`);
    }
}

const partitionTests = [
    {
        polygon: [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: 1, y: 1},
            {x: 0, y: 1}
        ],
        diagonals: []
    },
    {
        polygon: [
            {x: 0, y: 0},
            {x: 2, y: 0},
            {x: 3, y: 2},
            {x: 4, y: 1},
            {x: 3, y: 0},
            {x: 5, y: 0},
            {x: 6, y: 1},
            {x: 2, y: 5},
            {x: 0, y: 3}
        ],
        diagonals: [
            [{x: 2, y: 5}, {x: 3, y: 2}],
            [{x: 4, y: 1}, {x: 6, y: 1}]
        ]
    }
];

for (const test of partitionTests) {
    const actual = partition(test.polygon);
    if (JSON.stringify(actual) !== JSON.stringify(test.diagonals)) {
        throw new Error(`For polygon ${inspect(test.polygon)}, ` +
            `expected partition diagonals to be ${inspect(test.diagonals)}, ` +
            `but were ${inspect(actual)}`);
    }
}
