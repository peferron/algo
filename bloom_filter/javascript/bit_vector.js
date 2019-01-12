const position = bit => ({
    byte: bit >> 3, // Replace with Math.floor(bit / 8) for huge bit vectors.
    bit: bit % 8,
});

export default class BitVector {
    constructor(bitCount) {
        const byteCount = Math.ceil(bitCount / 8);
        const buffer = new ArrayBuffer(byteCount);
        this.a = new Uint8Array(buffer);
    }

    set(bit) {
        const p = position(bit);
        this.a[p.byte] |= 1 << p.bit;
    }

    has(bit) {
        const p = position(bit);
        return (this.a[p.byte] & 1 << p.bit) > 0;
    }
}
