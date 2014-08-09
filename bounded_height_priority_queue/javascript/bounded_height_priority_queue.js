'use strict';

// Priorities are ints ranging from 0 (lowest priority) to maxPriority (highest priority).
exports.Queue = function(maxPriority) {

    var a = initArray(maxPriority);
    var top = -1;

    this.insert = function(priority, value) {
        a[priority].push(value);
        top = Math.max(top, priority);
    };

    this.removeMax = function() {
        if (top < 0) {
            return;
        }
        var value = a[top].pop();
        while (top >= 0 && !a[top].length) {
            top--;
        }
        return value;
    };

    this.empty = function() {
        return top < 0;
    };
};

function initArray(maxPriority) {
    var a = [];
    for (var i = 0; i <= maxPriority; i++) {
        a.push([]);
    }
    return a;
}
