'use strict';

exports.mod = function(s, m) {
    return hash(s) % m;
};

function hash(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) {
        // Simple multiplicative hash. The constant 101 works well, see
        // http://www.strchr.com/hash_functions
        h = 101 * h + s.charCodeAt(i);

        // Bitwise arithmetic forces the result to be a 32-bit integer (see ECMAScript spec). Other
        // than that, h |= 0 (shorthand for h = h | 0) is a no-op.
        h |= 0;
    }
    return h;
}
