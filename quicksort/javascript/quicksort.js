export default function sort(a) {
    if (!a) {
        return;
    }
    sortRec(a, 0, a.length - 1);
}

function sortRec(a, start, end) {
    if (end < start + 1) {
        return;
    }
    const p = partition(a, start, end);
    sortRec(a, start, p - 1);
    sortRec(a, p + 1, end);
}

function partition(a, start, end) {
    const p = medianPivot(a, start, end);
    swap(a, p, end);
    let firstHigh = start;

    for (let i = start; i < end; i += 1) {
        if (a[i] < a[end]) {
            swap(a, firstHigh, i);
            firstHigh += 1;
        }
    }

    swap(a, firstHigh, end);
    return firstHigh;
}

function swap(a, i, j) {
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
}

function medianPivot(a, start, end) {
    const mid = start + Math.floor((end - start) / 2);

    if (between(a[start], a[mid], a[end])) {
        return start;
    }
    if (between(a[mid], a[start], a[end])) {
        return mid;
    }
    return end;
}

function between(a, x, y) {
    return x <= a && a <= y || y <= a && a <= x;
}

/* randomPivot is an alternative to medianPivot, but medianPivot is recommended.
function randomPivot(a, start, end) {
    // Math.random() returns a number in the range [0, 1)
    return start + Math.floor(Math.random() * (end - start + 1));
}
*/
