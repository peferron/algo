'use strict';

var assert = require('assert');

var sort = require('./heapsort.js');
var maxheap = require('./maxheap.js');

function testBasicInputs(maxHeapify) {
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

    tests.forEach(function(test) {
        var a = clone(test.in);
        sort(a, maxHeapify);
        assert.deepEqual(a, test.out);
    });
}

function testRandomInputs(maxHeapify) {
    for (var i = 0; i < 1000; i++) {
        testRandomInput(maxHeapify);
    }
}

function testRandomInput(maxHeapify) {
    var input = randomInts();
    var a = clone(input);

    sort(a, maxHeapify);
    assert(isSorted(a));
}

function randomInts() {
    var n = Math.floor(Math.random() * 1000);
    var a = new Array(n);
    for (var i = 0; i < n; i++) {
        // Use n as the upper bound to produce some duplicates.
        a[i] = Math.floor(Math.random() * n);
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

testBasicInputs(maxheap.fastHeapify);
testBasicInputs(maxheap.slowHeapify);

testRandomInputs(maxheap.fastHeapify);
testRandomInputs(maxheap.slowHeapify);

console.log('All tests OK.');
