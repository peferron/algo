'use strict';

exports.sort = function (a) {
    // console.log('sort:', a)

    if (!a) {
        return;
    }

    quicksort(a, 0, a.length - 1);
};

function quicksort(a, start, end) {
    // console.log('quicksort:', a, 'between', start, 'and', end);

    if (end < start + 1) {
        return;
    }

    var p = partition(a, start, end);
    quicksort(a, start, p - 1);
    quicksort(a, p + 1, end);
}

function partition(a, start, end) {
    var p = medianPivot(a, start, end);

    // console.log('partition:', a, 'between', start, 'and', end, 'with pivot', p);

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
    // console.log('swap:', a, 'indexes', i, 'and', j);

    var t = a[i];
    a[i] = a[j];
    a[j] = t;
}

function medianPivot(a, start, end) {
    var mid = Math.floor((end - start) / 2);

    if (between(a[start], a[mid], a[end])) {
        return start;
    }
    if (between(a[mid], a[start], a[end])) {
        return mid;
    }
    return end;
}

function between(a, x, y) {
    return x <= a && a <= y || y <= a && a <= y;
}

/* randomPivot is an alternative to medianPivot, but mediaPivot is recommended.
function randomPivot(a, start, end) {
    // Math.random() returns a number in the range [0, 1)
    return start + Math.floor(Math.random() * (end - start + 1));
}
*/
