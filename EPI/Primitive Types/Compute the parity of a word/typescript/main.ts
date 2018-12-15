const PARITY_8 = buildParityTable(1 << 8);
const MASK_8 = (1 << 8) - 1;

function buildParityTable(length: number): number[] {
    const table = new Array(length);

    for (let i = 0; i < length; i += 1) {
        const grayCode = i ^ (i >> 1);
        table[grayCode] = i % 2;
    }

    return table;
}

export default function parity32(value: number): number {
    let v = value;
    v ^= v >> 16;
    v ^= v >> 8;
    return PARITY_8[v & MASK_8];
}
