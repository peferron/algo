export default class CircularQueue<T> {
    private _size = 0;
    private start = 0;

    private array: (T | undefined)[];

    constructor(capacity = 0) {
        this.array = new Array(capacity);
    }

    get size(): number {
        return this._size;
    }

    enqueue(element: T): void {
        if (this._size === this.array.length) {
            this.increaseCapacity();
        }

        this.array[(this.start + this.size) % this.array.length] = element;
        this._size += 1;
    }

    dequeue(): T | undefined {
        if (this._size === 0) {
            return undefined;
        }

        const element = this.array[this.start];
        this.array[this.start] = undefined; // Let the element be garbage-collected.
        this.start = (this.start + 1) % this.array.length;
        this._size -= 1;
        return element;
    }

    private increaseCapacity(): void {
        const newArray = new Array(Math.max(10, this.array.length * 2));

        for (let i = 0; i < this._size; i += 1) {
            newArray[i] = this.array[(this.start + i) % this.array.length];
        }

        this.start = 0;
        this.array = newArray;
    }
}
