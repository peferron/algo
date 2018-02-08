const ZERO = '0'.charCodeAt(0);

const digitToChar = (digit: number) => String.fromCharCode(ZERO + digit);
const charToDigit = (char: string) => char.charCodeAt(0) - ZERO;

export function intToString(number: number): string {
    if (number < 0) {
        return '-' + intToString(-number);
    }

    if (number === 0) {
        return digitToChar(0);
    }

    const digits: number[] = [];

    for (let n = number; n > 0; n = Math.floor(n / 10)) {
        digits.push(n % 10);
    }

    return digits.reverse().map(digitToChar).join('');
}

// export function stringToInt(number: string): number {
//     let sign = 1;
//     let i = 0;

//     if (number[i] === '-') {
//         sign = -1;
//         i = 1;
//     }

//     let result = 0;

//     while (i < number.length) {
//         result = result * 10 + charToDigit(number[i]);
//         i += 1;
//     }

//     return sign * result;
// }

export function stringToInt(number: string): number {
    let isNegative = number[0] === '-';
    let result = 0;

    for (let i = isNegative ? 1 : 0; i < number.length; i += 1) {
        result = result * 10 + charToDigit(number[i]);
    }

    return isNegative ? -result : result;
}
