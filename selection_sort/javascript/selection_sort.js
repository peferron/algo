'use strict';

module.exports = sort;

function sort(a) {
    if (!a) {
        return;
    }
    for (var i = 0; i < a.length - 1; i++) {
        var j = smallest(a, i);
        swap(a, i, j);
    }
}

function smallest(a, start) {
    var s = start;
    for (var i = start; i < a.length; i++) {
        if (a[i] < a[s]) {
            s = i;
        }
    }
    return s;
}

function swap(a, i, j) {
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
}
