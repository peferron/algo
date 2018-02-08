import Heap from './heap';

interface Entry<T> {
    array: T[];
    index: number;
}

const DEFAULT_COMPARE = <T>(a: T, b: T) => a === b ? 0 : a < b ? -1 : 1;

export default function merge<T>(sortedArrays: T[][], compare = DEFAULT_COMPARE): T[] {
    const heap = new Heap<Entry<T>>((a, b) => compare(a.array[a.index], b.array[b.index]));

    for (const array of sortedArrays) {
        if (array.length > 0) {
            heap.insert({array, index: 0});
        }
    }

    const result: T[] = [];

    while (heap.size > 0) {
        const {array, index} = heap.removeMin()!;

        result.push(array[index]);

        if (index + 1 < array.length) {
            heap.insert({array, index: index + 1});
        }
    }

    return result;
}
