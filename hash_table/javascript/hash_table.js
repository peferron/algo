'use strict';

var hash = require('./hash.js');

exports.HashTable = function(size) {
    var a = [];

    this.has = function(key) {
        var h = hash.mod(key, size);
        var items = a[h];
        return indexOfItem(items, key) >= 0;
    };

    this.get = function(key) {
        var h = hash.mod(key, size);
        var items = a[h];
        var i = indexOfItem(items, key);
        if (i >= 0) {
            return items[i][1];
        }
    };

    this.set = function(key, value) {
        var h = hash.mod(key, size);
        var items = a[h];
        if (!items) {
            a[h] = [[key, value]];
            return;
        }
        var i = indexOfItem(items, key);
        if (i >= 0) {
            items[i][1] = value;
        } else {
            items.push([key, value]);
        }
    };

    this.del = function(key) {
        var h = hash.mod(key, size);
        var items = a[h];
        var i = indexOfItem(items, key);
        if (i >= 0) {
            del(items, i);
        }
    };
};

function indexOfItem(items, key) {
    if (!items) {
        return -1;
    }
    for (var i = 0; i < items.length; i++) {
        if (items[i][0] === key) {
            return i;
        }
    }
    return -1;
}

function del(arr, i) {
    // A splice would work too, but this is faster on big arrays - as long as order does not matter.
    if (i === arr.length - 1) {
        arr.pop();
    } else {
        arr[i] = arr.pop();
    }
}
