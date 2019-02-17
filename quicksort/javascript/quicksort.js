export default function sort(a) {
    if (a) {
        sortRec(a, 0, a.length);
    }
}

// `start` is inclusive and `end` is exclusive.
function sortRec(a, start, end) {
    if (end - start < 2) {
        return;
    }

    const originalPivotIndex = medianPivotIndex(a, start, end);
    const finalPivotIndex = partition(a, start, end, originalPivotIndex);
    sortRec(a, start, finalPivotIndex);
    sortRec(a, finalPivotIndex + 1, end);
}

function partition(a, start, end, pivotIndex) {
    const pivotValue = a[pivotIndex];
    swap(a, pivotIndex, end - 1);
    let lowerCount = 0;

    for (let i = start; i < end; i += 1) {
        if (a[i] <= pivotValue) {
            swap(a, start + lowerCount, i);
            lowerCount += 1;
        }
    }

    return start + lowerCount - 1;
}

function medianPivotIndex(a, start, end) {
    const mid = start + Math.floor((end - start) / 2);

    if (between(a[start], a[mid], a[end - 1])) {
        return start;
    }
    if (between(a[mid], a[start], a[end - 1])) {
        return mid;
    }
    return end - 1;
}

function swap(a, i, j) {
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
}

function between(value, bound1, bound2) {
    return bound1 <= value && value <= bound2 || bound2 <= value && value <= bound1;
}

/* randomPivotIndex is an alternative to medianPivotIndex, but medianPivotIndex is recommended.
function randomPivotIndex(start, end) {
    return start + Math.floor(Math.random() * (end - start));
}
*/
