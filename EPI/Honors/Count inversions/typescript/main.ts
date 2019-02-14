export function countInversionsBruteforce(a: number[]): number {
    let count = 0;

    for (let i = 0; i < a.length; i += 1) {
        for (let j = i + 1; j < a.length; j += 1) {
            if (a[i] > a[j]) {
                count += 1;
            }
        }
    }

    return count;
}

export function countInversionsDivideAndConquer(a: number[]): number {
    return rec(a, 0, a.length);
}

function rec(a: number[], start: number, end: number): number {
    if (end - start < 2) {
        return 0;
    }

    const {inversionsCount, lowerEnd, greaterStart} = partition(a, start, end);
    return inversionsCount + rec(a, start, lowerEnd) + rec(a, greaterStart, end);
}

function partition(a: number[], start: number, end: number): {inversionsCount: number, lowerEnd: number, greaterStart: number} {
    const pivotIndex = start + Math.floor(Math.random() * (end - start));
    const pivotValue = a[pivotIndex];
    const lower: number[] = [];
    const equal: number[] = [];
    const greater: number[] = [];
    let inversionsCount = 0;

    // At each step, append the current element to either the lower, equal, or greater array, and increment
    // inversionsCount by the number of inversions ending with this element that were broken by this move.
    for (let i = start; i < end ; i += 1) {
        const v = a[i];

        if (v < pivotValue) {
            lower.push(v);
            // Count inversions ending with this element that were broken by this move:
            // - No inversions are broken with elements < pivotValue, since the inversion is maintained in the lower
            //   array.
            // - Inversions are broken over all elements in the equal and greater array; the fact that they are present
            //   in these arrays means they were processed first, which means they were to the left of the current
            //   element, but will now be to its right.
            inversionsCount += equal.length + greater.length;
        } else if (v === pivotValue) {
            equal.push(v);
            // Count broken inversions ending with this element:
            // - No inversions can exist with elements <= pivotValue, since they are <= v.
            // - Inversions are broken over all elements in the greater array.
            inversionsCount += greater.length;
        } else {
            greater.push(v);
            // Count broken inversions ending with this element:
            // - No inversions can exist with elements <= pivotValue, since they are < v.
            // - No inversions are broken with elements > pivotValue, since the inversion is maintained in the greater
            //   array.
        }
    }

    a.splice(start, end - start, ...lower, ...equal, ...greater);

    return {
        inversionsCount,
        lowerEnd: start + lower.length,
        greaterStart: start + lower.length + equal.length
    };
}
