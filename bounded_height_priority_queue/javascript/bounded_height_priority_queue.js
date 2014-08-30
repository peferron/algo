'use strict';

module.exports = Queue;

// Keys must be integers ranging from 0 (highest priority) to p (lowest priority).
function Queue(p) {
    this.p = p;
    this.min = p + 1;
    this.a = initArray(p);
}

Queue.prototype.insert = function(key, value) {
    this.a[key].push(value);
    this.min = Math.min(this.min, key);
};

Queue.prototype.deleteMin = function() {
    if (this.min > this.p) {
        return;
    }
    var value = this.a[this.min].pop();
    while (this.min <= this.p && !this.a[this.min].length) {
        this.min++;
    }
    return value;
};

Queue.prototype.empty = function() {
    return this.min > this.p;
};

function initArray(p) {
    var a = new Array(p + 1);
    for (var i = 0; i <= p; i++) {
        a[i] = [];
    }
    return a;
}
