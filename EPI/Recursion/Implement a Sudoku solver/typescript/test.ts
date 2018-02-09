import solve from './main';

declare function require(name: string): any;
const assert = require('assert');
const inspect = (v: any) => require('util').inspect(v, {depth: null});

const tests: {problem: number[][], solvable: boolean, solution?: number[][]}[] = [
    {
        problem: [
            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],

            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],

            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],
        ],
        solvable: true,
        solution: [
            [1, 2, 3,  4, 5, 6,  7, 8, 9],
            [4, 5, 6,  7, 8, 9,  1, 2, 3],
            [7, 8, 9,  1, 2, 3,  4, 5, 6],

            [2, 1, 4,  3, 6, 5,  8, 9, 7],
            [3, 6, 5,  8, 9, 7,  2, 1, 4],
            [8, 9, 7,  2, 1, 4,  3, 6, 5],

            [5, 3, 1,  6, 4, 2,  9, 7, 8],
            [6, 4, 2,  9, 7, 8,  5, 3, 1],
            [9, 7, 8,  5, 3, 1,  6, 4, 2],
        ]
    },
    {
        problem: [
            [5, 3, 0,  0, 7, 0,  0, 0, 0],
            [6, 0, 0,  1, 9, 5,  0, 0, 0],
            [0, 9, 8,  0, 0, 0,  0, 6, 0],

            [8, 0, 0,  0, 6, 0,  0, 0, 3],
            [4, 0, 0,  8, 0, 3,  0, 0, 1],
            [7, 0, 0,  0, 2, 0,  0, 0, 6],

            [0, 6, 0,  0, 0, 0,  2, 8, 0],
            [0, 0, 0,  4, 1, 9,  0, 0, 5],
            [0, 0, 0,  0, 8, 0,  0, 7, 9],
        ],
        solvable: true,
        solution: [
            [5, 3, 4,  6, 7, 8,  9, 1, 2],
            [6, 7, 2,  1, 9, 5,  3, 4, 8],
            [1, 9, 8,  3, 4, 2,  5, 6, 7],

            [8, 5, 9,  7, 6, 1,  4, 2, 3],
            [4, 2, 6,  8, 5, 3,  7, 9, 1],
            [7, 1, 3,  9, 2, 4,  8, 5, 6],

            [9, 6, 1,  5, 3, 7,  2, 8, 4],
            [2, 8, 7,  4, 1, 9,  6, 3, 5],
            [3, 4, 5,  2, 8, 6,  1, 7, 9],
        ]
    },
    {
        problem: [
            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [1, 2, 3,  4, 0, 5,  6, 7, 8],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],

            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [0, 0, 0,  0, 9, 0,  0, 0, 0],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],

            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],
            [0, 0, 0,  0, 0, 0,  0, 0, 0],
        ],
        solvable: false
    },
];

for (const test of tests) {
    const grid = test.problem.map(row => [...row]);
    const solvable = solve(grid);

    assert.strictEqual(solvable, test.solvable, `For problem \n${inspect(test.problem)}, ` +
        `expected solvable to be ${test.solvable}, but was ${solvable}`);

    if (solvable) {
        assert.deepStrictEqual(grid, test.solution, `For problem \n${inspect(test.problem)}, ` +
            `expected solution to be \n${inspect(test.solution)}, but was \n${inspect(grid)}`);
    } else {
        assert.deepStrictEqual(grid, test.problem, `For problem \n${inspect(test.problem)}, ` +
            `expected input to be unchanged, but was \n${inspect(grid)}`);
    }
}
