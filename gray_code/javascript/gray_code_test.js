import assert from 'assert';
import grayCode from './gray_code';

const tests = [
    {
        n: 0,
        code: [
            [],
        ],
    },
    {
        n: 1,
        code: [
            [],
            [1],
        ],
    },
    {
        n: 2,
        code: [
            [],
            [1],
            [1, 2],
            [2],
        ],
    },
    {
        n: 3,
        code: [
            [],
            [1],
            [1, 2],
            [2],
            [2, 3],
            [1, 2, 3],
            [1, 3],
            [3],
        ],
    },
];

function runTest(test) {
    assert.deepStrictEqual(grayCode(test.n), test.code);
}

tests.forEach(runTest);
