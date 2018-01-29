export function isPalindromeReverseString(number: number): boolean {
    const s = number.toString(10);
    const r = [...s].reverse().join('');
    return s === r;
}

export function isPalindromeReverseNumber(number: number): boolean {
    if (!Number.isInteger(number) || number < 0) {
        return false;
    }

    let n = number;
    let r = 0;

    while (n > 0) {
        r = r * 10 + n % 10;
        n = Math.floor(n / 10);
    }

    return r === number;
}

export function isPalindromeLog(number: number): boolean {
    if (!Number.isInteger(number) || number < 0) {
        return false;
    }

    let n = number;
    let digits = Math.floor(Math.log10(n)) + 1;

    while (n > 0) {
        const low = n % 10;
        const pow = Math.pow(10, digits - 1);
        const high = Math.floor(n / pow);

        if (low !== high) {
            return false;
        }

        n = Math.floor((n - high * pow) / 10);
        digits -= 2;
    }

    return true;
}
