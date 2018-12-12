export class MaxHeap<T> {
    private array: T[] = [];

    constructor(private comparator: (a: T, b: T) => number) {}

    get length(): number {
        return this.array.length;
    }

    insert(element: T): void {
        this.array.push(element);
        this.bubbleUp(this.array.length - 1);
    }

    removeMax(): T | undefined {
        const first = this.array[0];
        const last = this.array.pop();

        if (this.length > 0) {
            this.array[0] = last!;
            this.bubbleDown(0);
        }

        return first;
    }

    values(): T[] {
        return this.array;
    }

    private bubbleUp(i: number): void {
        const p = this.parent(i);

        if (p >= 0 && this.compare(i, p) > 0) {
            this.swap(i, p);
            this.bubbleUp(p);
        }
    }

    private bubbleDown(i: number): void {
        const [l, r] = this.children(i);

        if (l < this.array.length) {
            const maxChild = r >= this.array.length || this.compare(l, r) > 0 ? l : r;

            if (this.compare(i, maxChild) < 0) {
                this.swap(i, maxChild);
                this.bubbleDown(maxChild);
            }
        }
    }

    private compare(i: number, j: number): number {
        return this.comparator(this.array[i], this.array[j]);
    }

    private swap(i: number, j: number): void {
        const v = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = v;
    }

    private parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    private children(i: number): [number, number] {
        return [i * 2 + 1, i * 2 + 2];
    }
}
