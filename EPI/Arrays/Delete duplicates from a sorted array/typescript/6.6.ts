export default function removeDuplicates(sortedValues: number[]): number {
    if (!sortedValues.length) {
        return 0;
    }

    let i = 0;

    for (let j = 1; j < sortedValues.length; j += 1) {
        if (sortedValues[i] !== sortedValues[j]) {
            sortedValues[i + 1] = sortedValues[j];
            i += 1;
        }
    }

    return i + 1;
}
