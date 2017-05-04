import Heap from './Heap';

interface IndexedElement<T> {
    index: number;
    element: T;
}

export default class Stack<T> {
    private heap = new Heap<IndexedElement<T>>((i, j) => j.index - i.index);

    push(element: T): void {
        this.heap.insert({
            index: this.heap.size,
            element,
        });
    }

    pop(): T | undefined {
        const indexElement = this.heap.remove();
        return indexElement && indexElement.element;
    }
}
