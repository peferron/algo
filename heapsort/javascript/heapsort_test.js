'use strict';

var assert = require('assert');

var heapsort = require('./heapsort.js');
var maxheap = require('./maxheap.js');

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

function test(heapify) {
    tests.forEach(function(test, i) {
        // console.log('Starting test #' + i + ' with input array', test.in);

        var a = clone(test.in);
        heapsort.sort(a, heapify);
        assert.deepEqual(a, test.out);
    });
}

function clone(a) {
    if (!a) {
        return a;
    }
    return a.slice(0);
}

test(maxheap.slowHeapify);
test(maxheap.fastHeapify);

console.log('All tests OK.');
