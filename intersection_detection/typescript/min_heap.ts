export default class MinHeap<T> {
    private a: T[] = [];

    constructor(private compare: (a: T, b: T) => number) {
    }

    private swap(i: number, j: number) {
        [this.a[i], this.a[j]] = [this.a[j], this.a[i]]
    }

    private bubbleUp(index: number) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex >= 0 && this.compare(this.a[index], this.a[parentIndex]) < 0) {
            this.swap(parentIndex, index);
            this.bubbleUp(parentIndex);
        }
    }

    insert(element: T) {
        this.a.push(element);
        this.bubbleUp(this.a.length - 1);
    }

    private bubbleDown(index: number) {
        const leftChildIndex = index * 2 + 1;
        if (leftChildIndex >= this.a.length) {
            return;
        }

        const rightChildIndex = leftChildIndex + 1;

        const minChildIndex = rightChildIndex < this.a.length &&
            this.compare(this.a[rightChildIndex], this.a[leftChildIndex]) < 0 ?
            rightChildIndex : leftChildIndex;

        if (this.compare(this.a[minChildIndex], this.a[index]) < 0) {
            this.swap(minChildIndex, index);
            this.bubbleDown(minChildIndex);
        }
    }

    removeMin(): T {
        const min = this.a[0];
        const last = this.a.pop()!;

        if (this.a.length) {
            this.a[0] = last;
            this.bubbleDown(0);
        }

        return min;
    }

    removeElement(predicate: (element: T) => boolean) {
        const index = this.a.findIndex(predicate);
        if (index < 0) {
            return;
        }

        if (index === this.a.length - 1) {
            this.a.pop();
        } else {
            this.a[index] = this.a.pop()!;
            this.bubbleDown(index);
        }
    }
}
