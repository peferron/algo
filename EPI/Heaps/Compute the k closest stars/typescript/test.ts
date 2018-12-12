import {Coordinates, getClosestStars} from './main';

declare function require(name: string): any;
const assert = require('assert');

const tests: {stars: Coordinates[], k: number, closest: Coordinates[]}[] = [
    {
        stars: [],
        k: 10,
        closest: []
    },
    {
        stars: [
            {x: 3, y: 0, z: 0},
            {x: 2, y: 0, z: 0},
        ],
        k: 10,
        closest: [
            {x: 3, y: 0, z: 0},
            {x: 2, y: 0, z: 0},
        ]
    },
    {
        stars: [
            {x: 3, y: 0, z: 0},
            {x: 0, y: 7, z: 0},
            {x: 2, y: 0, z: 0},
            {x: 5, y: 2, z: 0},
            {x: 0, y: 4, z: 0},
            {x: 0, y: 1, z: 1},
            {x: 1, y: 2, z: 3},
        ],
        k: 1,
        closest: [
            {x: 0, y: 1, z: 1},
        ]
    },
    {
        stars: [
            {x: 3, y: 0, z: 0},
            {x: 0, y: 7, z: 0},
            {x: 2, y: 0, z: 0},
            {x: 5, y: 2, z: 0},
            {x: 0, y: 4, z: 0},
            {x: 0, y: 1, z: 1},
            {x: 1, y: 2, z: 3},
        ],
        k: 4,
        closest: [
            {x: 1, y: 2, z: 3},
            {x: 3, y: 0, z: 0},
            {x: 2, y: 0, z: 0},
            {x: 0, y: 1, z: 1},
        ]
    },
];

for (const test of tests) {
    const actual = getClosestStars(test.stars, test.k);
    assert.deepStrictEqual(actual, test.closest, `For stars ${test.stars}, ` +
        `expected ${test.k} closest to be ${test.closest}, but were ${actual}`);
}
