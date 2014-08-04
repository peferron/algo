'use strict';

var assert = require('assert');

var heapsort = require('./heapsort.js');
var maxheap = require('./maxheap.js');

function basicTests(heapify) {
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
        heapsort.sort(a, heapify);
        assert.deepEqual(a, test.out);
    });
}

function randomTests(heapify) {
    for (var i = 0; i < 1000; i++) {
        randomTest(heapify);
    }
}

function randomTest(heapify) {
    var input = randomInts();
    var a = clone(input);

    heapsort.sort(a, heapify);
    assert(isSorted(a));
}

function randomInts() {
    var n = Math.floor(Math.random() * 1000);
    var a = [];
    for (var i = 0; i < n; i++) {
        // Use n as the upper bound to produce some duplicates.
        a.push(Math.floor(Math.random() * n));
    }
    return a;
}

function isSorted(a) {
    if (!a) {
        return true;
    }
    for (var i = 0; i < a.length - 1; i++) {
        if (a[i] > a[i+1]) {
            return false;
        }
    }
    return true;
}

function clone(a) {
    if (!a) {
        return a;
    }
    return a.slice(0);
}

basicTests(maxheap.slowHeapify);
basicTests(maxheap.fastHeapify);
randomTests(maxheap.slowHeapify);
randomTests(maxheap.fastHeapify);

console.log('All tests OK.');
