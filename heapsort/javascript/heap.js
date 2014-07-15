'use strict';

exports.Heap = function(values) {
    var h = fasterNewHeap(values);

    this.removeRoot = function() {
        var root = h[0];
        var last = h.pop();
        if (h.length) {
            h[0] = last;
            bubbleDown(h, 0);
        }
        return root;
    };
};

function newHeap(values) {
    var h = [];
    values.forEach(function(v) {
        insert(h, v);
    });
    return h;
}

function fasterNewHeap(values) {
    var h = values.slice(0);
    for (var i = Math.floor(h.length / 2); i >= 0; i--) {
        bubbleDown(h, i);
    }
    return h;
}

function parent(h, i) {
    if (i <= 0) {
        return -1;
    }
    return Math.floor((i - 1) / 2);
}

function children(h, i) {
    var left = 2 * i + 1;
    if (left >= h.length) {
        left = -1;
    }

    var right = 2 * i + 2;
    if (right >= h.length) {
        right = -1;
    }

    return {
        left: left,
        right: right
    };
}

function insert(h, v) {
    h.push(v);
    bubbleUp(h, h.length - 1);
}

function bubbleUp(h, i) {
    var p = parent(h, i);
    if (p >= 0 && h[p] > h[i]) {
        swap(h, p, i);
        bubbleUp(h, p);
    }
}

function bubbleDown(h, i) {
    var c = children(h, i);

    var min = i;
    if (c.left >= 0 && h[c.left] < h[min]) {
        min = c.left;
    }
    if (c.right >= 0 && h[c.right] < h[min]) {
        min = c.right;
    }

    if (min !== i) {
        swap(h, min, i);
        bubbleDown(h, min);
    }
}

function swap(h, i, j) {
    var t = h[i];
    h[i] = h[j];
    h[j] = t;
}
