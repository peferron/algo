interface Stack<T> {
    push(element: T): void;
    pop(): T | undefined;
    length: number;
}

export default class Queue<T> {
    private a: Stack<T> = [];
    private b: Stack<T> = [];

    enqueue(element: T): void {
        this.a.push(element);
    }

    dequeue(): T | undefined {
        while (this.b.length === 0) {
            while (this.a.length > 0) {
                this.b.push(this.a.pop()!);
            }
        }
        return this.b.pop();
    }

    get length(): number {
        return this.a.length + this.b.length;
    }
}
