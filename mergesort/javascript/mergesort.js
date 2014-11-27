'use strict';

module.exports = function(a) {
    if (!a) {
        return;
    }
    sort(a, 0, a.length - 1);
};

function sort(a, start, end) {
    if (end < start + 1) {
        return;
    }

    var mid = Math.floor((start + end) / 2);
    sort(a, start, mid);
    sort(a, mid + 1, end);
    merge(a, start, mid, end);
}

function merge(a, start, mid, end) {
    var merged = [];
    var left = start;
    var right = mid + 1;
    while (left <= mid || right <= end) {
        if (right > end || left <= mid && a[left] < a[right]) {
            merged.push(a[left]);
            left++;
        } else {
            merged.push(a[right]);
            right++;
        }
    }

    for (var i = 0; i < merged.length; i++) {
        a[start + i] = merged[i];
    }
}
