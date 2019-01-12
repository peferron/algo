import hash from './hash';

export default class HashTable {
    constructor(size) {
        this.size = size;
        this.a = [];
    }

    has(key) {
        const h = hash(key, this.size);
        const items = this.a[h];
        return indexOfItem(items, key) >= 0;
    }

    get(key) {
        const h = hash(key, this.size);
        const items = this.a[h];
        const i = indexOfItem(items, key);
        return i >= 0 ? items[i].value : undefined;
    }

    set(key, value) {
        const h = hash(key, this.size);
        const items = this.a[h];

        if (!items) {
            this.a[h] = [{key, value}];
            return;
        }

        const i = indexOfItem(items, key);

        if (i >= 0) {
            items[i].value = value;
        } else {
            items.push({key, value});
        }
    }

    del(key) {
        const h = hash(key, this.size);
        const items = this.a[h];
        const i = indexOfItem(items, key);
        if (i >= 0) {
            del(items, i);
        }
    }
}

function indexOfItem(items, key) {
    return items ? items.findIndex(item => item.key === key) : -1;
}

function del(arr, i) {
    // A splice would work too, but this is faster on big arrays — as long as order does not matter.
    if (i === arr.length - 1) {
        arr.pop();
    } else {
        arr[i] = arr.pop();
    }
}
