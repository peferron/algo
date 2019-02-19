// alphabetSize, charToIndex and indexToChar are hardcoded here to keep the code short, however they could easily be be
// passed as arguments to the Trie constructor.
const alphabetSize = 36; // 0-9 and a-z
const charToIndex = char => parseInt(char, alphabetSize);
const indexToChar = index => index.toString(alphabetSize);

export default class Trie {
    constructor() {
        this.root = new Node();
    }

    has(key) {
        const n = find(this.root, key);
        return n && n.hasValue();
    }

    get(key) {
        const n = find(this.root, key);
        return n && n.hasValue() ? n.value : undefined;
    }

    set(key, value) {
        set(this.root, key, value);
    }

    del(key) {
        del(this.root, key[Symbol.iterator]());
    }

    all() {
        const a = [];
        preOrder(this.root, '', (key, value) => {
            a.push({key, value});
        });
        return a;
    }
}

class Node {
    constructor() {
        this.children = new Array(alphabetSize);
    }

    hasValue() {
        return this.hasOwnProperty('value');
    }

    delValue() {
        delete this.value;
    }
}

function find(n, key) {
    for (const c of key) {
        const i = charToIndex(c);
        const child = n.children[i];
        if (child) {
            n = child;
        } else {
            return undefined;
        }
    }
    return n;
}

function set(n, key, value) {
    for (const c of key) {
        const i = charToIndex(c);
        let child = n.children[i];
        if (!child) {
            child = new Node();
            n.children[i] = child;
        }
        n = child;
    }
    n.value = value;
}

function del(n, keyIterator) {
    const c = keyIterator.next();

    if (c.done) {
        n.delValue();
        return;
    }

    const i = charToIndex(c.value);
    const child = n.children[i];
    if (!child) {
        return;
    }

    del(child, keyIterator);

    if (!child.hasValue() && child.children.every(x => x === undefined)) {
        n.children[i] = undefined;
    }
}

function preOrder(n, key, callback) {
    if (n.hasValue()) {
        callback(key, n.value);
    }
    for (const [i, child] of n.children.entries()) {
        if (child) {
            preOrder(child, key + indexToChar(i), callback);
        }
    }
}

// function log(n, indent = 2) {
//     const spaces = new Array(indent + 1).join(' ');
//     for (const [i, child] of n.children.entries()) {
//         if (child) {
//             const v = child.hasValue() ? `(${child.value})` : '';
//             console.log(`${spaces}${indexToChar(i)} ${v}`);
//             log(child, indent + 2);
//         }
//     }
// }
