'use strict';

module.exports = HashTable;

var hash = require('./hash.js');

function HashTable(size) {
    this.size = size;
    this.a = [];
}

HashTable.prototype.has = function(key) {
    var h = hash(key, this.size);
    var items = this.a[h];
    return indexOfItem(items, key) >= 0;
};

HashTable.prototype.get = function(key) {
    var h = hash(key, this.size);
    var items = this.a[h];
    var i = indexOfItem(items, key);
    if (i >= 0) {
        return items[i][1];
    }
};

HashTable.prototype.set = function(key, value) {
    var h = hash(key, this.size);
    var items = this.a[h];
    if (!items) {
        this.a[h] = [[key, value]];
        return;
    }
    var i = indexOfItem(items, key);
    if (i >= 0) {
        items[i][1] = value;
    } else {
        items.push([key, value]);
    }
};

HashTable.prototype.del = function(key) {
    var h = hash(key, this.size);
    var items = this.a[h];
    var i = indexOfItem(items, key);
    if (i >= 0) {
        del(items, i);
    }
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
