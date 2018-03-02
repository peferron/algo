export default function rearrangeDutch(values: number[], pivotIndex: number): void {
    const pivot = values[pivotIndex];
    let lowerLen = 0;
    let equalLen = 0;

    for (const [i, v] of values.entries()) {
        if (v < pivot) {
            swap(values, lowerLen, i);
            if (equalLen > 0) {
                swap(values, lowerLen + equalLen, i);
            }
            lowerLen += 1;
        } else if (v === pivot) {
            swap(values, lowerLen + equalLen, i);
            equalLen += 1;
        }
    }
}

function swap(array: any[], i: number, j: number): void {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}
