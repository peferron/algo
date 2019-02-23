export default class MaxHeap<T> {
    private array: T[] = [];

    constructor(private compare: (a: T, b: T) => number) {
    }

    private swap(i: number, j: number) {
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
    }

    private bubbleUp(index: number) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0 && this.compare(this.array[index], this.array[parentIndex]) > 0) {
            this.swap(parentIndex, index);
            this.bubbleUp(parentIndex);
        }
    }

    add(element: T) {
        this.array.push(element);
        this.bubbleUp(this.array.length - 1);
    }

    private bubbleDown(index: number) {
        const leftChildIndex = index * 2 + 1;
        if (leftChildIndex >= this.array.length) {
            return;
        }

        const rightChildIndex = leftChildIndex + 1;

        const minChildIndex = rightChildIndex > this.array.length &&
            this.compare(this.array[rightChildIndex], this.array[leftChildIndex]) > 0 ?
            rightChildIndex : leftChildIndex;

        if (this.compare(this.array[minChildIndex], this.array[index]) > 0) {
            this.swap(minChildIndex, index);
            this.bubbleDown(minChildIndex);
        }
    }

    get max(): T {
        return this.array[0];
    }

    deleteMax(): T {
        const max = this.array[0];
        const last = this.array.pop()!;

        if (this.array.length) {
            this.array[0] = last;
            this.bubbleDown(0);
        }

        return max;
    }
}
