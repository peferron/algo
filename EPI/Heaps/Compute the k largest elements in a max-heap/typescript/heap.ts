class InternalMaxHeap<T> {
    private array: T[] = [];

    constructor(private compare: (a: T, b: T) => number) {
    }

    get size(): number {
        return this.array.length;
    }

    insert(element: T): void {
        this.array.push(element);
        this.bubbleUp(this.array.length - 1);
    }

    protected removeMax(): T | undefined {
        const first = this.array[0];
        const last = this.array.pop();

        if (this.array.length > 0) {
            this.array[0] = last!;
            this.bubbleDown(0);
        }

        return first;
    }

    private indexCompare(i: number, j: number): number {
        return this.compare(this.array[i], this.array[j]);
    }

    private parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    private maxChild(i: number): number {
        const l = 2 * i + 1;

        if (l >= this.array.length) {
            return -1;
        }

        const r = 2 * i + 2;
        return r >= this.array.length || this.indexCompare(l, r) > 0 ? l : r;
    }

    private swap(i: number, j: number): void {
        const tmp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = tmp;
    }

    private bubbleUp(i: number): void {
        const p = this.parent(i);

        if (p >= 0 && this.indexCompare(p, i) < 0) {
            this.swap(p, i);
            this.bubbleUp(p);
        }
    }

    private bubbleDown(i: number): void {
        const maxChild = this.maxChild(i);

        if (maxChild >= 0 && this.indexCompare(maxChild, i) > 0) {
            this.swap(maxChild, i);
        }
    }
}

export class MaxHeap<T> extends InternalMaxHeap<T> {
    // Make removeMax public.
    removeMax(): T | undefined {
        return super.removeMax();
    }
}

export class MinHeap<T> extends InternalMaxHeap<T> {
    constructor(compare: (a: T, b: T) => number) {
        // Invert comparison.
        super((a, b) => compare(b, a));
    }

    removeMin(): T | undefined {
        return super.removeMax();
    }
}
