export default class MaxHeap {
    private values: number[] = [];
    private valueToIndexes = new Map<number, Set<number>>();

    max(): number {
        return this.values[0];
    }

    add(value: number) {
        this.values.push(value);

        const index = this.values.length - 1;

        if (this.valueToIndexes.has(value)) {
            this.valueToIndexes.get(value)!.add(index);
        } else {
            this.valueToIndexes.set(value, new Set([index]));
        }

        this.bubbleUp(index);
    }

    delete(value: number) {
        const index = this.valueToIndexes.get(value)!.values().next().value;
        const lastIndex = this.values.length - 1;

        if (index !== lastIndex) {
            this.swap(index, lastIndex);
        }

        this.values.pop();
        this.valueToIndexes.get(value)!.delete(lastIndex);

        if (index !== lastIndex) {
            this.bubbleDown(index);
        }
    }

    bubbleUp(index: number) {
        if (index === 0) {
            return;
        }

        const value = this.values[index];
        const parentIndex = Math.floor((index - 1) / 2);
        const parentValue = this.values[parentIndex];

        if (value < parentValue) {
            return;
        }

        this.swap(index, parentIndex);
        this.bubbleUp(parentIndex);
    }

    bubbleDown(index: number) {
        const value = this.values[index];
        const maxChildIndex = this.maxChildIndex(index);

        if (maxChildIndex < 0 || this.values[maxChildIndex] < value) {
            return;
        }

        this.swap(index, maxChildIndex);
        this.bubbleDown(maxChildIndex);
    }

    swap(aIndex: number, bIndex: number) {
        const a = this.values[aIndex];
        const b = this.values[bIndex];

        if (a === b) {
            return;
        }

        this.values[aIndex] = b;
        this.values[bIndex] = a;

        const aIndexes = this.valueToIndexes.get(a)!;
        aIndexes.delete(aIndex);
        aIndexes.add(bIndex);

        const bIndexes = this.valueToIndexes.get(b)!;
        bIndexes.delete(bIndex);
        bIndexes.add(aIndex);
    }

    maxChildIndex(index: number) {
        const leftChildIndex = index * 2 + 1;
        if (leftChildIndex >= this.values.length) {
            return -1;
        }

        const rightChildIndex = index * 2 + 2;
        if (rightChildIndex >= this.values.length) {
            return leftChildIndex;
        }

        return this.values[leftChildIndex] > this.values[rightChildIndex] ?
            leftChildIndex : rightChildIndex;
    }
}
