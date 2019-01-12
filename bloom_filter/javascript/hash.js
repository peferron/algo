export default function hash(factor, modulo, str) {
    const h = rawHash(factor, str) % modulo;
    if (h < 0) {
        return h + modulo;
    }
    return h;
}

function rawHash(factor, str) {
    let h = 0;
    for (let i = 0; i < str.length; i += 1) {
        h = factor * h + str.charCodeAt(i);

        // Bitwise arithmetic forces the result to be a 32-bit integer (see ECMAScript spec).
        // Other than that, h |= 0 (shorthand for h = h | 0) is a no-op.
        h |= 0;
    }
    return h;
}
