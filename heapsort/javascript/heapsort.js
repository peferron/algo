'use strict';

var maxheap = require('./maxheap.js');

exports.sort = function (a, maxHeapify) {
    // console.log('sort:', a)

    if (!a) {
        return;
    }

    var h = new maxheap.Heap(a, maxHeapify);

    for (var i = a.length - 1; i >= 0; i--) {
        a[i] = h.deleteMax();
    }
};
