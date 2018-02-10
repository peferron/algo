import {MaxHeap} from './heap';

export default function getLargest(heap: number[], count: number): number[] {
    const result: number[] = [];
    const candidates = new MaxHeap<number>((i, j) => heap[i] - heap[j]);

    candidates.insert(0);

    while (result.length < count && candidates.size > 0) {
        const maxIndex = candidates.removeMax()!;
        result.push(heap[maxIndex]);

        const leftIndex = 2 * maxIndex + 1;
        if (leftIndex < heap.length) {
            candidates.insert(leftIndex);
        }

        const rightIndex = 2 * maxIndex + 2;
        if (rightIndex < heap.length) {
            candidates.insert(rightIndex);
        }
    }

    return result;
}
