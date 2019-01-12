export function fastHeapify(a) {
    const end = a.length - 1;
    for (let i = parent(end); i >= 0; i -= 1) {
        bubbleDown(a, i, end);
    }
    return new Heap(a, end);
}

export function slowHeapify(a) {
    const end = a.length - 1;
    for (let i = 1; i <= end; i += 1) {
        bubbleUp(a, i, end);
    }
    return new Heap(a, end);
}

class Heap {
    constructor(a, end) {
        this.a = a;
        this.end = end;
    }

    deleteMax() {
        const maxValue = this.a[0];
        this.a[0] = this.a[this.end];
        this.end -= 1;
        bubbleDown(this.a, 0, this.end);
        return maxValue;
    }
}

function bubbleUp(a, i) {
    const p = parent(i);
    if (p >= 0 && a[p] < a[i]) {
        swap(a, p, i);
        bubbleUp(a, p);
    }
}

function bubbleDown(a, i, end) {
    let max = i;

    const l = leftChild(i);
    if (l <= end && a[l] > a[max]) {
        max = l;
    }

    const r = rightChild(i);
    if (r <= end && a[r] > a[max]) {
        max = r;
    }

    if (max !== i) {
        swap(a, max, i);
        bubbleDown(a, max, end);
    }
}

function swap(a, i, j) {
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
}

function parent(i) {
    return Math.floor((i - 1) / 2);
}

function leftChild(i) {
    return 2 * i + 1;
}

function rightChild(i) {
    return 2 * i + 2;
}
