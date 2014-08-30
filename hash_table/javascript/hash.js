'use strict';

module.exports = hash;

function hash(str, modulo) {
    return rawHash(str) % modulo;
}

function rawHash(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
        h = 101 * h + str.charCodeAt(i);

        // Bitwise arithmetic forces the result to be a 32-bit integer (see ECMAScript spec). Other
        // than that, h |= 0 (shorthand for h = h | 0) is a no-op.
        h |= 0;
    }
    return h;
}
