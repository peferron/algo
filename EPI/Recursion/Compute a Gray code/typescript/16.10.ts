export default function grayCode(bits: number): number[] {
    if (bits === 0) {
        return [0];
    }

    const prev = grayCode(bits - 1);

    return [
        ...prev,
        ...prev.reverse().map(v => v | (1 << (bits - 1))),
    ];
}
