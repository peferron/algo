'use strict';

exports.Heap = function(a, heapify) {
    var end = a.length - 1;
    heapify(a, end);

    this.removeRoot = function() {
        var root = a[0];

        a[0] = a[end];
        end--;
        bubbleDown(a, 0, end);

        return root;
    };
};

exports.slowHeapify = function(a, end) {
    for (var i = 1; i <= end; i++) {
        bubbleUp(a, i);
    }
};

exports.fastHeapify = function(a, end) {
    for (var i = parent(end); i >= 0; i--) {
        bubbleDown(a, i, end);
    }
};

function bubbleUp(a, i) {
    var p = parent(i);
    if (p >= 0 && a[p] < a[i]) {
        swap(a, p, i);
        bubbleUp(a, p);
    }
}

function bubbleDown(a, i, end) {
    var max = i;

    var l = leftChild(i);
    if (l <= end && a[l] > a[max]) {
        max = l;
    }

    var r = rightChild(i);
    if (r <= end && a[r] > a[max]) {
        max = r;
    }

    if (max !== i) {
        swap(a, max, i);
        bubbleDown(a, max, end);
    }
}

function swap(a, i, j) {
    var t = a[i];
    a[i] = a[j];
    a[j] = t;
}

function parent(i) {
    return Math.floor((i - 1) / 2);
}

function leftChild(i) {
    return 2 * i + 1;
}

function rightChild(i) {
    return 2 * i + 2;
}
