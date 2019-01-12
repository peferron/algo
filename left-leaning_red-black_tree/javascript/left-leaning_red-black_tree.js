export const RED = 'red';
export const BLACK = 'black';

export default class Tree {
    constructor() {
        this.root = undefined;
    }

    has(key) {
        return find(this.root, key) !== undefined;
    }

    get(key) {
        const n = find(this.root, key);
        if (n) {
            return n.value;
        }
    }

    set(key, value) {
        this.root = insert(this.root, key, value);
        this.root.color = BLACK;
    }

    del(key) {
        this.root = del(this.root, key);
        if (this.root) {
            this.root.color = BLACK;
        }
    }

    all() {
        const a = [];
        inOrder(this.root, n => {
            a.push({key: n.key, value: n.value});
        });
        return a;
    }
}

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.color = RED;
        this.left = undefined;
        this.right = undefined;
    }
}

function flipColors(n) {
    flipColor(n);
    flipColor(n.left);
    flipColor(n.right);
}

function flipColor(n) {
    if (n.color === BLACK) {
        n.color = RED;
    } else {
        n.color = BLACK;
    }
}

function rotateLeft(n) {
    const r = n.right;
    n.right = r.left;
    r.left = n;
    r.color = n.color;
    n.color = RED;
    return r;
}

function rotateRight(n) {
    const l = n.left;
    n.left = l.right;
    l.right = n;
    l.color = n.color;
    n.color = RED;
    return l;
}

function moveRedLeft(n) {
    flipColors(n);
    if (red(n.right.left)) {
        n.right = rotateRight(n.right);
        n = rotateLeft(n);
        flipColors(n);
    }
    return n;
}

function moveRedRight(n) {
    flipColors(n);
    if (red(n.left.left)) {
        n = rotateRight(n);
        flipColors(n);
    }
    return n;
}

function red(n) {
    return n && n.color === RED;
}

function inOrder(n, callback) {
    if (!n) {
        return;
    }
    inOrder(n.left, callback);
    callback(n);
    inOrder(n.right, callback);
}

function fixUp(n) {
    if (red(n.right) && !red(n.left)) {
        n = rotateLeft(n);
    }
    if (red(n.left) && red(n.left.left)) {
        n = rotateRight(n);
    }
    if (red(n.left) && red(n.right)) {
        flipColors(n);
    }
    return n;
}

function deleteMin(n) {
    if (!n.left) {
        return undefined;
    }
    if (!red(n.left) && !red(n.left.left)) {
        n = moveRedLeft(n);
    }
    n.left = deleteMin(n.left);
    return fixUp(n);
}

function find(n, key) {
    if (!n) {
        return undefined;
    }
    if (n.key === key) {
        return n;
    }
    const child = key < n.key ? n.left : n.right;
    return find(child, key);
}

function findMin(n) {
    if (!n) {
        return null;
    }
    return n.left ? findMin(n.left) : n;
}

function insert(p, key, value) {
    if (!p) {
        return new Node(key, value);
    }
    if (key === p.key) {
        p.value = value;
    } else if (key < p.key) {
        p.left = insert(p.left, key, value);
    } else {
        p.right = insert(p.right, key, value);
    }
    return fixUp(p);
}

function del(n, key) {
    if (!n) {
        return undefined;
    }
    if (key < n.key) {
        if (n.left && !red(n.left) && !red(n.left.left)) {
            n = moveRedLeft(n);
        }
        n.left = del(n.left, key);
        return fixUp(n);
    }
    if (red(n.left)) {
        n = rotateRight(n);
    }
    if (key === n.key && !n.right) {
        return undefined;
    }
    if (n.right && !red(n.right) && !red(n.right.left)) {
        n = moveRedRight(n);
    }
    if (key === n.key) {
        const min = findMin(n.right);
        n.key = min.key;
        n.value = min.value;
        n.right = deleteMin(n.right);
    } else {
        n.right = del(n.right, key);
    }
    return fixUp(n);
}

// function log(n, indent) {
//     indent = indent || 0;
//     var spaces = new Array(indent + 1).join(' ');
//     console.log(spaces + str(n));
//     if (n) {
//         log(n.left, indent + 2);
//         log(n.right, indent + 2);
//     }
// }

// function str(n) {
//     if (n === null) {
//         return '[nil]';
//     }
//     return '[' + n.color + '] ' + n.key + ': ' + n.value;
// }
