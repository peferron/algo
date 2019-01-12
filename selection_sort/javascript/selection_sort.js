export default function sort(a) {
    if (!a) {
        return;
    }
    for (let i = 0; i < a.length - 1; i += 1) {
        const j = smallest(a, i);
        swap(a, i, j);
    }
}

function smallest(a, start) {
    let s = start;
    for (let i = start + 1; i < a.length; i += 1) {
        if (a[i] < a[s]) {
            s = i;
        }
    }
    return s;
}

function swap(a, i, j) {
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
}
