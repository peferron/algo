export default class Heap<T> {
    private array: T[] = [];

    constructor(private compare: (a: T, b: T) => number) {
    }

    insert(element: T): void {
        this.array.push(element);
        this.bubbleUp(this.array.length - 1);
    }

    removeMin(): T | undefined {
        if (this.array.length === 0) {
            return undefined;
        }

        const min = this.array[0];

        this.array[0] = this.array[this.array.length - 1];
        this.array.pop();
        if (this.array.length > 0) {
            this.bubbleDown(0);
        }

        return min;
    }

    get size(): number {
        return this.array.length;
    }

    private parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    private minChild(i: number): number {
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left >= this.array.length) {
            return -1;
        }

        return right >= this.array.length ||
            this.compare(this.array[left], this.array[right]) < 0 ? left : right;
    }

    private swap(i: number, j: number): void {
        const tmp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = tmp;
    }

    private bubbleUp(i: number): void {
        while (true) {
            const p = this.parent(i);

            if (p >= 0 && this.compare(this.array[i], this.array[p]) < 0) {
                this.swap(i, p);
                i = p;
            } else {
                return;
            }
        }
    }

    private bubbleDown(i: number): void {
        while (true) {
            const c = this.minChild(i);

            if (c >= 0 && this.compare(this.array[i], this.array[c]) > 0) {
                this.swap(i, c);
                i = c;
            } else {
                return;
            }
        }
    }
}
