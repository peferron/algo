export default class CircularQueue<T> {
    private _size = 0;
    private d = 0;
    private e = 0;

    private array: (T | undefined)[];

    constructor(capacity: number) {
        this.array = new Array(capacity);
    }

    get size(): number {
        return this._size;
    }

    enqueue(element: T): void {
        if (this._size === this.array.length) {
            this.grow();
        }

        this.array[this.e] = element;
        this.e = (this.e + 1) % this.array.length;
        this._size += 1;
    }

    dequeue(): T | undefined {
        if (this._size === 0) {
            return undefined;
        }

        const element = this.array[this.d];
        this.array[this.d] = undefined; // Let the element be GC'ed.
        this.d = (this.d + 1) % this.array.length;
        this._size -= 1;
        return element;
    }

    private grow(): void {
        const newArray = new Array(this.array.length * 2);

        for (let i = 0; i < this.array.length; i += 1) {
            newArray[i] = this.array[(this.d + i) % this.array.length];
        }

        this.d = 0;
        this.e = this.array.length;
        this.array = newArray;
    }
}
