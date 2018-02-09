export default function increment(digits: number[]): void {
    digits[digits.length - 1] += 1;

    for (let i = digits.length - 1; i >= 0 && digits[i] === 10; i -= 1) {
        digits[i] = 0;

        if (i > 0) {
            digits[i - 1] += 1;
        } else {
            digits.unshift(1);
        }
    }
}
