'use strict';

var heapsort = require('./heapsort.js');

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

var ok = true;

tests.forEach(function(test, i) {
    console.log('Starting test #' + i + ' with input array', test.in);
    var a = clone(test.in);
    heapsort.sort(a);
    if (equal(a, test.out)) {
        console.log('Test OK.\n');
    } else {
        console.error('In test #' + i + ' with input array', test.in,
            ', expected sorted array to be', test.out,
            ', was', a, '\n');
        ok = false;
    }
});

if (ok) {
    console.log('All tests OK.');
} else {
    console.error('Some tests failed.');
}

function clone(a) {
    if (!a) {
        return a;
    }
    return a.slice(0);
}

function equal(a, b) {
    if (!a && !b) {
        return true;
    }
    if (!a || !b || a.length !== b.length) {
        return false;
    }
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
