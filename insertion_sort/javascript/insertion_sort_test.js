'use strict';

var assert = require('assert');

var insertion_sort = require('./insertion_sort.js');

function basicTests() {
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
        insertion_sort.sort(a);
        assert.deepEqual(a, test.out);
    });
}

function randomTests() {
    for (var i = 0; i < 1000; i++) {
        randomTest();
    }
}

function randomTest() {
    var input = randomInts();
    var a = clone(input);

    insertion_sort.sort(a);
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

basicTests();
randomTests();

console.log('All tests OK.');
