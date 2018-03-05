export default class MinHeap<T> {
    private array: T[] = [];

    constructor(public compare: (a: T, b: T) => number) {}

    get size():number {
        return this.array.length;
    }

    insert(element: T): void {
        this.array.push(element);
        this.bubbleUp(this.array.length - 1);
    }

    removeMin(): T | undefined {
        const first = this.array[0];
        const last = this.array.pop();

        if (this.array.length > 0) {
            this.array[0] = last!;
            this.bubbleDown(0);
        }

        return first;
    }

    private compareIndexes(i: number, j: number): number {
        return this.compare(this.array[i], this.array[j]);
    }

    private bubbleUp(i: number): void {
        const p = this.parent(i);

        if (p >= 0 && this.compareIndexes(i, p) < 0) {
            this.swap(i, p);
            this.bubbleUp(p);
        }
    }

    private bubbleDown(i: number): void {
        const [l, r] = this.children(i);
        const minChildIndex = r < 0 || this.compareIndexes(l, r) < 0 ? l : r;

        if (minChildIndex >= 0 && this.compareIndexes(minChildIndex, i) < 0) {
            this.swap(i, minChildIndex);
            this.bubbleDown(minChildIndex);
        }
    }

    private swap(i: number, j: number): void {
        const tmp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = tmp;
    }

    private parent(i: number): number {
        return i > 0 ? Math.floor((i - 1) / 2) : -1;
    }

    private children(i: number): [number, number] {
        const l = 2 * i + 1;
        const r = l + 1;
        return [l, r].map(j => j < this.array.length ? j : -1) as [number, number];
    }
}
