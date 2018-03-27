import Heap from './heap';

export default function* sort(values: IterableIterator<number>, k: number): IterableIterator<number> {
    const minHeap = new Heap<number>((a: number, b: number) => a - b);

    for (const v of values) {
        minHeap.insert(v);

        if (minHeap.size > k) {
            yield minHeap.removeMin()!;
        }
    }

    while (minHeap.size > 0) {
        yield minHeap.removeMin()!;
    }
}
