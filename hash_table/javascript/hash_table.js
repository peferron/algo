'use strict';

var hash = require('./hash.js');

exports.HashTable = function(size) {
    var a = [];

    this.has = function(k) {
        var h = hash.mod(k, size);
        var items = a[h];
        return indexOfItem(items, k) >= 0;
    };

    this.get = function(k) {
        var h = hash.mod(k, size);
        var items = a[h];
        var i = indexOfItem(items, k);
        if (i >= 0) {
            return items[i][1];
        }
    };

    this.set = function(k, v) {
        var h = hash.mod(k, size);
        var items = a[h];
        if (!items) {
            a[h] = [[k, v]];
            return;
        }
        var i = indexOfItem(items, k);
        if (i >= 0) {
            items[i][1] = v;
        } else {
            items.push([k, v]);
        }
    };

    this.delete = function(k) {
        var h = hash.mod(k, size);
        var items = a[h];
        var i = indexOfItem(items, k);
        if (i >= 0) {
            remove(items, i);
        }
    };
};

function indexOfItem(items, k) {
    if (!items) {
        return -1;
    }
    for (var i = 0; i < items.length; i++) {
        if (items[i][0] === k) {
            return i;
        }
    }
    return -1;
}

function remove(a, i) {
    // A splice would work too, but this is faster on big arrays.
    if (i === a.length - 1) {
        a.pop();
    } else {
        a[i] = a.pop();
    }
}
