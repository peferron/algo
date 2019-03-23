export default function maxGain(values: number[]): number {
    const n = values.length;
    const cache = new Array<number>(n + 1).fill(0);

    // start is inclusive
    for (let start = n - 1; start >= 0; start -= 1) {
        let total = 0;

        // end is exclusive
        for (let end = start + 1; end <= n; end += 1) {
            total += values[end - 1];
            cache[end] = total - Math.min(cache[end - 1], cache[end]);
        }
    }

    return cache[n];
}
