'use strict';

var heap = require('./heap.js');

exports.sort = function (a) {
    // console.log('sort:', a)

    if (!a) {
        return;
    }

    var h = new heap.Heap(a);
    for (var i = 0; i < a.length; i++) {
        a[i] = h.removeRoot();
    }
};
