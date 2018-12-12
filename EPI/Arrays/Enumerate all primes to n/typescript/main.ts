export default function primes(max: number): number[] {
    const candidates = new Array(max + 1).fill(true);
    const result: number[] = [];

    for (let i = 2; i <= max; i += 1) {
        if (candidates[i]) {
            result.push(i);
            for (let j = 2; i * j <= max; j += 1) {
                candidates[i * j] = false;
            }
        }
    }

    return result;
}
