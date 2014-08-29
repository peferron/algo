'use strict';

exports.sort = function (a) {
    if (!a) {
        return;
    }
    for (var i = 0; i < a.length; i++) {
        insert(a, i);
    }
};

function insert(a, i) {
    for (var j = i; j > 0 && a[j] < a[j - 1]; j--) {
        swap(a, j, j - 1);
    }
}

function swap(a, i, j) {
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
}
