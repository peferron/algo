export default class Queue {
    // Keys must be integers ranging from 0 (highest priority) to p (lowest priority).
    constructor(p) {
        this.p = p;
        this.min = p + 1;
        this.a = Array.from({length: p + 1}, () => []);
    }

    insert(key, value) {
        this.a[key].push(value);
        this.min = Math.min(this.min, key);
    }

    deleteMin() {
        if (this.min > this.p) {
            return;
        }
        const value = this.a[this.min].pop();
        while (this.min <= this.p && !this.a[this.min].length) {
            this.min += 1;
        }
        return value;
    }

    empty() {
        return this.min > this.p;
    }
}
