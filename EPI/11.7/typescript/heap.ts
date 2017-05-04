export default class Heap<T> {
    private array: T[] = [];

    constructor(private compare: (a: T, b: T) => number) {
    }

    public get size(): number {
        return this.array.length;
    }

    public insert(element: T): void {
        this.array.push(element);
        this.bubbleUp(this.array.length  - 1);
    }

    public remove(): T | undefined {
        const first = this.array[0];
        const last = this.array.pop();

        if (this.array.length > 0) {
            this.array[0] = last!;
            this.bubbleDown(0);
        }

        return first;
    }

    private bubbleUp(i: number): void {
        const p = this.parentIndex(i);

        if (p < 0 || this.compare(this.array[p], this.array[i]) <= 0) {
            return;
        }

        this.swap(p, i);
        this.bubbleUp(p);
    }

    private bubbleDown(i: number): void {
        const {l, r} = this.childrenIndexes(i);

        if (l < 0) {
            return;
        }

        const minChildIndex = r < 0 || this.compare(this.array[l], this.array[r]) < 0 ? l : r;

        if (this.compare(this.array[i], this.array[minChildIndex]) > 0) {
            this.swap(i, minChildIndex);
            this.bubbleDown(minChildIndex );
        }
    }

    private swap(i: number, j: number): void {
        const tmp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = tmp;
    }

    private parentIndex(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    private childrenIndexes(p: number): {l: number, r: number} {
        const l = p * 2;
        const r = l + 1;

        return {
            l: l < this.array.length ? l : -1,
            r: r < this.array.length ? r : -1
        };
    }
}
