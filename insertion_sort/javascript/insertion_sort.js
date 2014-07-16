'use strict';

exports.sort = function (a) {
    // console.log('sort:', a);

    if (!a) {
        return;
    }

    for (var i = 0; i < a.length; i++) {
        insert(a, i);
    }
};

function insert(a, i) {
    // console.log('insert:', a, 'index', i);

    for (var j = i; j > 0 && a[j] < a[j - 1]; j--) {
        swap(a, j, j - 1);
    }
}

function swap(a, i, j) {
    // console.log('swap:', a, 'indexes', i, 'and', j);

    var t = a[i];
    a[i] = a[j];
    a[j] = t;
}
