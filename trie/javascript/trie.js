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
        del(this.root, key);
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
    if (!key) {
        return n;
    }
    const i = charToIndex(key[0]);
    const child = n.children[i];
    return child && find(child, key.substring(1));
}

function set(n, key, value) {
    if (!key) {
        n.value = value;
        return;
    }
    const i = charToIndex(key[0]);
    let child = n.children[i];
    if (!child) {
        child = new Node();
        n.children[i] = child;
    }
    set(child, key.substring(1), value);
}

function del(n, key) {
    const i = charToIndex(key[0]);
    const child = n.children[i];
    if (!child) {
        return;
    }
    if (key.length > 1) {
        del(child, key.substring(1));
        return;
    }
    // Delete this child.
    if (child.children.some(x => x !== undefined)) {
        child.delValue();
    } else {
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

// function log(n, indent) {
//     var spaces = new Array(indent + 1).join(' ');
//     n.children.forEach(function(child, i) {
//         if (child) {
//             var v = child.hasValue() ? '(' + child.value + ')' : '';
//             console.log(spaces + indexToChar(i) + ' ' + v);
//             log(child, indent + 2);
//         }
//     });
// }
