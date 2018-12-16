const MASK_8 = (1 << 8) - 1;
const REVERSE_8 = buildReverse8();

export default function reverse16(value: number): number {
    const left = value >> 8;
    const right = value & MASK_8;
    return (REVERSE_8[right] << 8) | REVERSE_8[left];
}

// One wait to build the table of reversed 8-bit ints would be to write down a table of reversed
// 4-bit ints by hand (there are only 16 of them) and use the same algorithm as above.
//
// Here, we use a different way: if we know the binary representation of i, then to compute i + 1,
// we find the rightmost bit set to 0, flip it to 1, and then flip all following bits to 0. The same
// can be done to find the next reversed number; the only difference is that we do it in the
// opposite direction. This is probably slower and more likely to have bugs than using a 4-bit table
// as mentioned above, but I leave it here as a curiosity.
function buildReverse8(): number[] {
    const array = new Array(1 << 8);
    array[0] = 0;

    for (let i = 1; i < array.length; i += 1) {
        let v = array[i - 1];

        for (let j = 7; ; j -= 1) {
            v ^= (1 << j);
            if ((v & (1 << j)) > 0) {
                break;
            }
        }

        array[i] = v;
    }

    return array;
}
