export function grayCodeRecursive(bits: number): number[] {
    if (bits === 0) {
        return [0];
    }

    const prev = grayCodeRecursive(bits - 1);

    return [
        ...prev,
        ...prev.reverse().map(v => v | (1 << (bits - 1))),
    ];
}

const grayCodeAt = (n: number) => n ^ (n >> 1);

export function grayCodeIterative(bits: number): number[] {
    const length = 1 << bits;
    return Array.from({length}, (_, i) => grayCodeAt(i));
}
