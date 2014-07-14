'use strict';

exports.sort = function (a) {
    // console.log('sort:', a)

    if (!a) {
        return;
    }

    mergesort(a, 0, a.length - 1);
};

function mergesort(a, start, end) {
    // console.log('mergesort:', a.slice(start, end + 1))

    if (end < start + 1) {
        return;
    }

    var mid = Math.floor((start + end) / 2);
    mergesort(a, start, mid);
    mergesort(a, mid + 1, end);
    merge(a, start, mid, end);
}

function merge(a, start, mid, end) {
    // console.log('merge:', a.slice(start, mid + 1), 'and', a.slice(mid + 1, end + 1))

    var m = [];
    var l = start;
    var r = mid + 1;
    while (l <= mid || r <= end) {
        if (r > end || l <= mid && a[l] < a[r]) {
            m.push(a[l]);
            l++;
        } else {
            m.push(a[r]);
            r++;
        }
    }

    for (var i = 0; i < m.length; i++) {
        a[start + i] = m[i];
    }
}
