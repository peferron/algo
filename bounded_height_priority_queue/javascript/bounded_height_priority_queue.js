'use strict';

// Keys must be integers ranging from 0 (highest priority) to p (lowest priority).
exports.Queue = function(p) {

    var a = initArray(p);
    var min = p + 1;

    this.insert = function(key, value) {
        a[key].push(value);
        min = Math.min(min, key);
    };

    this.removeMin = function() {
        if (min > p) {
            return;
        }
        var value = a[min].pop();
        while (min <= p && !a[min].length) {
            min++;
        }
        return value;
    };

    this.empty = function() {
        return min > p;
    };
};

function initArray(p) {
    var a = [];
    for (var i = 0; i <= p; i++) {
        a.push([]);
    }
    return a;
}
