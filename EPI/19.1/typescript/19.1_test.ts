import {Color, Coord, path} from './19.1';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

interface Test {
    maze: Color[][];
    subTests: SubTest[];
}

interface SubTest {
    start: Coord;
    end: Coord;
    path: Coord[] | undefined;
}

const tests: Test[] = [
    {
        maze: [
            [0],
        ],
        subTests: [
            {
                start: {row: 0, col: 0},
                end: {row: 0, col: 0},
                path: [
                    {row: 0, col: 0},
                ]
            },
        ]
    },
    {
        maze: [
            [0, 1],
            [0, 0],
        ],
        subTests: [
            {
                start: {row: 0, col: 0},
                end: {row: 1, col: 0},
                path: [
                    {row: 0, col: 0},
                    {row: 1, col: 0},
                ]
            },
            {
                start: {row: 1, col: 0},
                end: {row: 1, col: 1},
                path: [
                    {row: 1, col: 0},
                    {row: 1, col: 1},
                ]
            },
            {
                start: {row: 0, col: 0},
                end: {row: 1, col: 1},
                path: [
                    {row: 0, col: 0},
                    {row: 1, col: 0},
                    {row: 1, col: 1},
                ]
            },
            {
                start: {row: 0, col: 0},
                end: {row: 0, col: 1},
                path: undefined
            },
        ]
    },
    {
        maze: [
            [0, 0, 0, 0],
            [1, 0, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 1],
        ],
        subTests: [
            {
                start: {row: 1, col: 1},
                end: {row: 2, col: 0},
                path: [
                    {row: 1, col: 1},
                    {row: 0, col: 1},
                    {row: 0, col: 2},
                    {row: 0, col: 3},
                    {row: 1, col: 3},
                    {row: 2, col: 3},
                    {row: 2, col: 2},
                    {row: 3, col: 2},
                    {row: 3, col: 1},
                    {row: 3, col: 0},
                    {row: 2, col: 0},
                ]
            },
        ]
    },
];

for (const test of tests) {
    for (const subTest of test.subTests) {
        const mutableMaze = test.maze.map(row => row.map(cell => cell));
        const actual = path(mutableMaze, subTest.start, subTest.end)
        assert.deepStrictEqual(actual, subTest.path, `For maze ${inspect(test.maze)}, ` +
            `start ${inspect(subTest.start)}, and end ${inspect(subTest.end)}, ` +
            `expected path to be ${inspect(subTest.path)}, but was ${inspect(actual)}`);
    }
}
