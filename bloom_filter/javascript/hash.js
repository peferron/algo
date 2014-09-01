'use strict';

module.exports = hash;

function hash(factor, modulo, str) {
    var h = rawHash(factor, str) % modulo;
    if (h < 0) {
        return h + modulo;
    }
    return h;
}

function rawHash(factor, str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
        h = factor * h + str.charCodeAt(i);

        // Bitwise arithmetic forces the result to be a 32-bit integer (see ECMAScript spec). Other
        // than that, h |= 0 (shorthand for h = h | 0) is a no-op.
        h |= 0;
    }
    return h;
}
