'use strict';

var assert = require('assert');

var grayCode = require('./gray_code.js');

assert.deepEqual(grayCode(0), [
    []
]);

assert.deepEqual(grayCode(1), [
    [],
    [1]
]);

assert.deepEqual(grayCode(2), [
    [],
    [1],
    [1, 2],
    [2]
]);

assert.deepEqual(grayCode(3), [
    [],
    [1],
    [1, 2],
    [2],
    [2, 3],
    [1, 2, 3],
    [1, 3],
    [3]
]);

console.log('All tests OK.');
