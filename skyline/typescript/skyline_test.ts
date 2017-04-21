import {Rectangle, Point, skyline} from './skyline';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

interface Test {
    buildings: Rectangle[];
    skyline: Point[];
}

const tests: Test[] = [
    {
        buildings: [
            {left: 1, right: 3, height: 2},
            {left: 2, right: 4, height: 2},
        ],
        skyline: [
            {x: 1, y: 2},
            {x: 4, y: 0},
        ]
    },
    {
        buildings: [
            {left: 1, right: 2, height: 2},
            {left: 2, right: 4, height: 2},
        ],
        skyline: [
            {x: 1, y: 2},
            {x: 4, y: 0},
        ]
    },
    {
        buildings: [
            {left: 1, right: 2, height: 2},
            {left: 3, right: 4, height: 2},
        ],
        skyline: [
            {x: 1, y: 2},
            {x: 2, y: 0},
            {x: 3, y: 2},
            {x: 4, y: 0},
        ]
    },
    {
        buildings: [
            {left: 2, right: 6, height: 4},
            {left: 9, right: 11, height: 1},
            {left: 0, right: 4, height: 3},
            {left: 5, right: 14, height: 2},
            {left: 8, right: 12, height: 3},
        ],
        skyline: [
            {x: 0, y: 3},
            {x: 2, y: 4},
            {x: 6, y: 2},
            {x: 8, y: 3},
            {x: 12, y: 2},
            {x: 14, y: 0},
        ]
    },
]

function runTest(test: Test) {
    const actual = skyline(test.buildings);
    assert.deepEqual(actual, test.skyline, `For buildings ${inspect(test.buildings)}, ` +
        `expected skyline to be ${inspect(test.skyline)}, but was ${inspect(actual)}`)
}

tests.forEach(runTest);
