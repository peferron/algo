export default function sqrt(x: number, tolerance = 0.01): number {
    const toleranceSquared = tolerance * tolerance;
    let [min, max] = x < 1 ? [x, 1] : [1, x];

    while (true) {
        const mid = min + (max - min) / 2;
        const midSquared = mid * mid;

        if (Math.abs(midSquared - x) < toleranceSquared) {
            return mid;
        }

        if (midSquared < x) {
            min = mid;
        } else {
            max = mid;
        }
    }
}
