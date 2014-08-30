'use strict';

exports.sort = function (a, maxHeapify) {
    if (!a) {
        return;
    }

    var h = maxHeapify(a);

    for (var i = a.length - 1; i >= 0; i--) {
        a[i] = h.deleteMax();
    }
};
