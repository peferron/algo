'use strict';

module.exports = sort;

function sort(a, maxHeapify) {
    if (!a) {
        return;
    }

    var h = maxHeapify(a);

    for (var i = a.length - 1; i >= 0; i--) {
        a[i] = h.deleteMax();
    }
}
