'use strict';

module.exports = grayCode;

function grayCode(n) {
    if (n <= 0) {
        return [[]];
    }

    // Get the Gray code for n-1.
    var a = grayCode(n - 1);

    // Build a reversed copy.
    var b = a.map(function(_, i) {
        return a[a.length - 1 - i].slice();
    });

    // Append n to each subset in the copy.
    // Note: This can be merged into the reverse copy step to reduce the number of iterations, but
    // it's clearer this way.
    b.forEach(function(s) {
        s.push(n);
    });

    // Return the concatenated result.
    return a.concat(b);
}
