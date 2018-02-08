const VALUES = new Map<string, number>([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000],
]);

export default function evaluate(roman: string): number {
    let smallestValue = Number.POSITIVE_INFINITY;
    let result = 0;

    for (const char of roman) {
        const value = VALUES.get(char)!;
        result += value;
        if (value > smallestValue) {
            result -= 2 * smallestValue;
        } else {
            smallestValue = value;
        }
    }

    return result;
}
