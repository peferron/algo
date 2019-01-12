export default function hash(str, modulo) {
    const h = rawHash(str) % modulo;
    return h < 0 ? h + modulo : h;
}

function rawHash(str) {
    let h = 0;

    for (let i = 0; i < str.length; i += 1) {
        h = 101 * h + str.charCodeAt(i);

        // Bitwise arithmetic forces the result to be a 32-bit integer (see ECMAScript spec).
        // Other than that, h |= 0 (shorthand for h = h | 0) is a no-op.
        h |= 0;
    }

    return h;
}
