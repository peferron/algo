'use strict';

module.exports = function(a) {
    if (!a) {
        return;
    }
    sort(a, 0, a.length - 1);
};

function sort(a, start, end) {
    if (end < start + 1) {
        return;
    }
    var p = partition(a, start, end);
    sort(a, start, p - 1);
    sort(a, p + 1, end);
}

function partition(a, start, end) {
    var p = medianPivot(a, start, end);

    swap(a, p, end);

    var firstHigh = start;
    for (var i = start; i < end; i++) {
        if (a[i] < a[end]) {
            swap(a, firstHigh, i);
            firstHigh++;
        }
    }
    swap(a, firstHigh, end);

    return firstHigh;
}

function swap(a, i, j) {
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
}

function medianPivot(a, start, end) {
    var mid = start + Math.floor((end - start) / 2);

    if (between(a[start], a[mid], a[end])) {
        return start;
    }
    if (between(a[mid], a[start], a[end])) {
        return mid;
    }
    return end;
}

function between(a, x, y) {
    return x <= a && a <= y || y <= a && a <= x;
}

/* randomPivot is an alternative to medianPivot, but medianPivot is recommended.
function randomPivot(a, start, end) {
    // Math.random() returns a number in the range [0, 1)
    return start + Math.floor(Math.random() * (end - start + 1));
}
*/
