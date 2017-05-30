const CHARS_TO_VALUES = new Map([
    ['0', 0], ['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7], ['8', 8],
    ['9', 9], ['A', 10], ['B', 11], ['C', 12], ['D', 13], ['E', 14], ['F', 15],
]);

const VALUES_TO_CHARS = new Map([...CHARS_TO_VALUES].map(([c, v]): [number, string] => [v, c]));

export default function convert(s1: string, b1: number, b2: number): string {
    // Native one-liner: return parseInt(s1, b1).toString(b2).toUpperCase();
    return encode(decode(s1, b1), b2);
}

function decode(s: string, b: number): number {
    let result = 0;
    let sign = 1;

    for (const c of s) {
        if (c === '-') {
            sign = -1;
        } else {
            result = b * result + CHARS_TO_VALUES.get(c)!;
        }
    }

    return sign * result;
}

function encode(n: number, b: number): string {
    if (n < 0) {
        return '-' + encode(-n, b);
    }

    if (n === 0) {
        return VALUES_TO_CHARS.get(0)!;
    }

    let s = '';
    let remaining = n;

    while (remaining > 0) {
        s += VALUES_TO_CHARS.get(remaining % b)!;
        remaining = Math.floor(remaining / b);
    }

    return [...s].reverse().join('');
}
