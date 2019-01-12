export default function sort(a) {
    if (!a) {
        return;
    }

    for (let i = 0; i < a.length; i += 1) {
        insert(a, i);
    }
}

function insert(a, i) {
    for (let j = i; j > 0 && a[j] < a[j - 1]; j -= 1) {
        swap(a, j, j - 1);
    }
}

function swap(a, i, j) {
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
}
