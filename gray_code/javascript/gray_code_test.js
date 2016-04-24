'use strict';

var assert = require('assert');

var grayCode = require('./gray_code.js');

var tests = [
    {
        n: 0,
        code: [
            []
        ]
    },
    {
        n: 1,
        code: [
            [],
            [1]
        ]
    },
    {
        n: 2,
        code: [
            [],
            [1],
            [1, 2],
            [2]
        ]
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
            [3]
        ]
    }
];

function runTest(test) {
    assert.deepEqual(grayCode(test.n), test.code);
}

tests.forEach(runTest);
