export default function sqrt(n: number): number {
    let low = 0;
    let high = n;

    while (low < high) {
        let mid = Math.ceil(low + (high - low) / 2);

        if (mid * mid > n) {
            high = mid - 1;
        } else {
            low = mid;
        }
    }

    return high;
}
