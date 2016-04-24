'use strict';

var assert = require('assert');

var permutation_generation = require('./permutation_generation.js');

var tests = [
    // n = 1
    [
        [1]
    ],

    // n = 2
    [
        [1, 2],
        [2, 1]
    ],

    // n = 3
    [
        [1, 2, 3],
        [1, 3, 2],
        [2, 1, 3],
        [2, 3, 1],
        [3, 1, 2],
        [3, 2, 1]
    ],

    // n = 4
    [
        [1, 2, 3, 4],
        [1, 2, 4, 3],
        [1, 3, 2, 4],
        [1, 3, 4, 2],
        [1, 4, 2, 3],
        [1, 4, 3, 2],
        [2, 1, 3, 4],
        [2, 1, 4, 3],
        [2, 3, 1, 4],
        [2, 3, 4, 1],
        [2, 4, 1, 3],
        [2, 4, 3, 1],
        [3, 1, 2, 4],
        [3, 1, 4, 2],
        [3, 2, 1, 4],
        [3, 2, 4, 1],
        [3, 4, 1, 2],
        [3, 4, 2, 1],
        [4, 1, 2, 3],
        [4, 1, 3, 2],
        [4, 2, 1, 3],
        [4, 2, 3, 1],
        [4, 3, 1, 2],
        [4, 3, 2, 1]
    ]
];

function testRank() {
    tests.forEach(function(permutations) {
        permutations.forEach(function(p, m) {
            var m2 = permutation_generation.rank(p);
            assert.strictEqual(m2, m, 'For p: ' + p + ', expected m to be ' + m + ' but was ' + m2);
        });
    });
}

function testUnrank() {
    tests.forEach(function(permutations) {
        permutations.forEach(function(p, m) {
            var n = p.length;
            var p2 = permutation_generation.unrank(m, n);
            assert.deepEqual(p2, p, 'For m: ' + m + ' and n: ' + n + ', expected p to be ' + p +
                ' but was ' + p2);
        });
    });
}

function testAll() {
    tests.forEach(function(permutations) {
        var n = permutations[0].length;
        var permutations2 = permutation_generation.all(n);
        assert.deepEqual(permutations2, permutations, 'For n: ' + n +
            ', expected permutations to be ' + permutations + ' but was ' + permutations2);
    });
}

testRank();
testUnrank();
testAll();
