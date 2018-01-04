interface Node {
    ISBN: string;
    prev?: Node;
    next?: Node;
}

export default class ISBNCache {
    private first: Node | undefined;
    private last: Node | undefined;
    private map = new Map<string, {node: Node, price: number}>();

    constructor(public capacity: number) {}

    insert(ISBN: string, price: number): void {
        this.remove(ISBN);

        if (this.map.size >= this.capacity) {
            this.remove(this.last!.ISBN);
        }

        const node: Node = {ISBN, next: this.first};
        this.map.set(ISBN, {node, price});

        if (this.first) {
            this.first.prev = node;
        }

        this.first = node;

        if (!this.last) {
            this.last = node;
        }
    }

    lookup(ISBN: string): number | undefined {
        if (!this.map.has(ISBN)) {
            return undefined;
        }

        const {price} = this.map.get(ISBN)!;
        this.remove(ISBN);
        this.insert(ISBN, price);
        return price;
    }

    remove(ISBN: string): void {
        if (!this.map.has(ISBN)) {
            return;
        }

        const {node} = this.map.get(ISBN)!;
        this.map.delete(ISBN);

        if (node === this.first) {
            this.first = node.next;
        }

        if (node === this.last) {
            this.last = node.prev;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }
    }
}
