'use strict';

exports.rank = rank;
exports.unrank = unrank;
exports.all = all;

// rank returns the position in lexicographically increasing order of the permutation p in the n!
// permutations of the integers from 1 to n, where n = p.length.
function rank(p) {
    var n = p.length;
    if (n === 1) {
        // Base case: n = 1 has only one permutation, {1}, with rank 0.
        return 0;
    }

    var first = p[0];
    // p starts with first; that means it is preceded in lexicographically increasing order by all
    // the permutations starting with 1...(first-1).
    // How many permutations is that? The n! permutations of 1...n are evenly divided between each
    // starting number, so a given starting number has n!/n = (n-1)! permutations.
    // The number of permutations starting with 1...(first-1) is then (first-1)*(n-1)!.
    var r1 = (first - 1) * factorial(n - 1);

    // And among all permutations starting with first, what is the rank of p?
    var r2 = rank(removeFirst(p));

    return r1 + r2;
}

// removeFirst returns a copy of the permutation p, removing the first element and relabelling the
// remaining elements to become a permutation of the integers from 1 to p.length-1.
// Example: {3, 1, 4, 2} becomes {1, 4, 2} after removal and {1, 3, 2} after relabelling.
function removeFirst(p) {
    return p.slice(1).map(function(v) {
        return v > p[0] ? v - 1 : v;
    });
}

// unrank returns the permutation in position m in lexicographically increasing order of the n!
// permutations of the integers from 1 to n.
function unrank(m, n) {
    if (m === 0) {
        // The first permutation in lexicographically increasing order is {1, 2, ..., n}.
        var p = new Array(n);
        for (var i = 0; i < n; i++) {
            p[i] = i + 1;
        }
        return p;
    }

    // The reasoning is similar to the rank function - which makes sense since rank and unrank are
    // inverses of each other. There are n! permutations of 1...n; in lexicographically increasing
    // order, the first (n-1)! permutations are the ones starting with 1, then the next (n-1)!
    // permutations are the ones starting with 2, and so on.
    // A simple division can tell in which of these "groups" the permutation of rank m falls.
    var groupLength = factorial(n - 1);
    var first = Math.floor(m / groupLength) + 1;

    return insertFirst(first, unrank(m % groupLength, n - 1));
}

// insertFirst returns a copy of the permutation p, inserting first in first position and
// relabelling the remaining elements to become a permutation of the integers from 1 to p.length+1.
// Example: 3 and {1, 3, 2} becomes {3, 1, 3, 2} after insertion and {3, 1, 4, 2} after relabelling.
function insertFirst(first, p) {
    return [first].concat(p.map(function(v) {
        return v >= first ? v + 1 : v;
    }));
}

// all returns the n! permutations of the integers from 1 to n, sorted in lexicographically
// increasing order.
function all(n) {
    var f = factorial(n);
    var a = new Array(f);
    for (var m = 0; m < f; m++) {
        a[m] = unrank(m, n);
    }
    return a;
}

function factorial(n) {
    if (n < 2) {
        return 1;
    }
    return n * factorial(n - 1);
}
