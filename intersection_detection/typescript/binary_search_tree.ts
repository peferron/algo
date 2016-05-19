export default class BinarySearchTree<T> {
    private a: T[] = [];

    constructor(private compare: (a: T, b: T) => number) {
    }

    insert(element: T): void {
        this.a.push(element);
        this.a.sort(this.compare);
    }

    swap(a: T, b: T): void {
        const ai = this.a.indexOf(a);
        const bi = this.a.indexOf(b);
        this.a[ai] = b;
        this.a[bi] = a;
    }

    remove(element: T): void {
        const index = this.a.indexOf(element);
        if (index >= 0) {
            this.a.splice(index, 1);
        }
    }

    predecessor(element: T): T {
        const index = this.a.indexOf(element);
        return this.a[index - 1];
    }

    successor(element: T): T {
        const index = this.a.indexOf(element);
        return this.a[index + 1];
    }
}
