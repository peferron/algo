'use strict';

var assert = require('assert');

var selection_sort = require('./selection_sort.js');

var tests = [
    {
        in: null,
        out: null
    },
    {
        in: [],
        out: []
    },
    {
        in: [1],
        out: [1]
    },
    {
        in: [3, 7, 2, 1, 5, 4, 6, 7],
        out: [1, 2, 3, 4, 5, 6, 7, 7]
    }
];

tests.forEach(function(test, i) {
    // console.log('Starting test #' + i + ' with input array', test.in);

    var a = clone(test.in);
    selection_sort.sort(a);
    assert.deepEqual(a, test.out);
});

console.log('All tests OK.');

function clone(a) {
    if (!a) {
        return a;
    }
    return a.slice(0);
}
