export default function grayCode(n) {
    if (n <= 0) {
        return [[]];
    }

    // Get the Gray code for n-1.
    const a = grayCode(n - 1);

    // Build a reversed copy.
    const b = a.map((_, i) => a[a.length - 1 - i].slice());

    // Append n to each subset in the copy. This could be merged into the reverse copy step to reduce the number of
    // iterations, but it's clearer this way.
    for (const s of b) {
        s.push(n);
    }

    // Return the concatenated result.
    return [...a, ...b];
}
