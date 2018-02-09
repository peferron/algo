export default function reverse(n: number): number {
    const sign = n >= 0 ? 1 : -1;
    let absN = Math.abs(n);
    let revAbsN = 0;

    while (absN > 0) {
        revAbsN = 10 * revAbsN + (absN % 10);
        absN = Math.floor(absN / 10);
    }

    return sign * revAbsN;
}
