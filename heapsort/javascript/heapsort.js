export default function sort(a, maxHeapify) {
    if (!a) {
        return;
    }

    const h = maxHeapify(a);

    for (let i = a.length - 1; i >= 0; i -= 1) {
        a[i] = h.deleteMax();
    }
}
