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

    const mid = Math.floor((start + end) / 2);
    sortRec(a, start, mid);
    sortRec(a, mid + 1, end);
    merge(a, start, mid, end);
}

function merge(a, start, mid, end) {
    const merged = [];
    let left = start;
    let right = mid + 1;

    while (left <= mid || right <= end) {
        if (right > end || left <= mid && a[left] < a[right]) {
            merged.push(a[left]);
            left += 1;
        } else {
            merged.push(a[right]);
            right += 1;
        }
    }

    for (let i = 0; i < merged.length; i += 1) {
        a[start + i] = merged[i];
    }
}
