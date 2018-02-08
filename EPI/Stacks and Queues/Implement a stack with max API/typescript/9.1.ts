export default class Stack<T> {
    private elements: T[] = [];
    private maxIndexes: number[] = [];

    constructor(private compare: (a: T, b: T) => number) {
    }

    private maxIndex(): number {
        return this.maxIndexes.length === 0 ? -1 : this.maxIndexes[this.maxIndexes.length - 1];
    }

    max(): T | undefined {
        const maxIndex = this.maxIndex();
        return maxIndex < 0 ? undefined : this.elements[maxIndex];
    }

    push(element: T): void {
        if (this.maxIndexes.length === 0 || this.compare(this.max()!, element) < 0) {
            this.maxIndexes.push(this.elements.length);
        }

        this.elements.push(element);
    }

    pop(): T | undefined {
        if (this.maxIndex() === this.elements.length - 1) {
            this.maxIndexes.pop();
        }

        return this.elements.pop();
    }
}
