'use strict';

exports.sort = function (a) {
    // console.log('sort:', a);

    if (!a) {
        return;
    }

    for (var i = 0; i < a.length - 1; i++) {
        var j = smallest(a, i);
        swap(a, i, j);
    }
};

function smallest(a, start) {
    // console.log('smallest:', a, 'starting from index', start);

    var s = start;
    for (var i = start; i < a.length; i++) {
        if (a[i] < a[s]) {
            s = i;
        }
    }
    return s;
}

function swap(a, i, j) {
    // console.log('swap:', a, 'indexes', i, 'and', j);

    var t = a[i];
    a[i] = a[j];
    a[j] = t;
}
