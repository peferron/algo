'use strict';

var RED = 'red';
var BLACK = 'black';

exports.Tree = function() {
    var root = null;

    this.has = function(key) {
        var n = find(root, key);
        return n && n.key === key;
    };

    this.get = function(key) {
        var n = find(root, key);
        if (n && n.key === key) {
            return n.value;
        }
    };

    this.set = function(key, value) {
        var n = find(root, key);
        if (n && n.key === key) {
            n.value = value;
        } else {
            root = insert(n, key, value) || root;
        }
    };

    this.del = function(key) {
    };

    this.all = function() {
    };

    this.log = function() {
        log(root);
    };
};

function log(n, indent) {
    indent = indent || 0;
    var spaces = new Array(indent + 1).join(' ');
    if (!n) {
        console.log(spaces + '[nil]');
        return;
    }
    console.log(spaces + '[' + n.color + '] ' + n.key + ': ' + n.value);
    log(n.leftChild, indent + 2);
    log(n.rightChild, indent + 2);
}

function Node(key, value, color) {
    this.key = key;
    this.value = value;
    this.color = color;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
}

Node.prototype.grandparent = function() {
    if (!this.parent) {
        return null;
    }
    return this.parent.parent;
};

Node.prototype.uncle = function() {
    if (!this.parent) {
        return null;
    }
    if (this.parent.leftChild === this) {
        return this.parent.rightChild;
    }
    return this.parent.leftChild;
};

function find(n, key) {
    if (!n) {
        return null;
    }
    if (n.key === key) {
        return n;
    }
    if (key < n.key) {
        if (!n.leftChild) {
            return n;
        }
        return find(n.leftChild, key);
    }
    if (!n.rightChild) {
        return n;
    }
    return find(n.rightChild, key);
}

function rotateLeft(n) {
    var r = n.rightChild;
    n.rightChild = r.leftChild;
    r.parent = n.parent;
    r.leftChild = n;
    n.parent = r;
}

function rotateRight(n) {
    var l = n.leftChild;
    n.leftChild = l.rightChild;
    l.parent = n.parent;
    l.rightChild = n;
    n.parent = l;
}

// Set returns the new root of the tree.
function set(root, key, value) {

}

// Inserts a new node below the given parent. If the root of the tree has changed, returns the new
// root. Otherwise, returns null.
function insert(p, key, value) {
    var n = new Node(key, value, RED);
    if (p) {
        n.parent = p;
        if (value < p.value) {
            p.leftChild = n;
        } else {
            p.rightChild = n;
        }
    }
    return insertCase1(n);
}

// Case 1: the new node is the root.
// => Issue: the root must be black.
// => Solution: color the node black. Done.
function insertCase1(n) {
    if (!n.parent) {
        n.color = BLACK;
        return n;
    }
    return insertCase2(n);
}

// Case 2: the new node is not the root, and the parent is black.
// => Issue: none. Inserting a new red node doesn't change the black-height, and it's fine for a
// black parent to have a red child.
// => Solution: do nothing. Done.
function insertCase2(n) {
    if (n.parent.color === BLACK) {
        return null;
    }
    return insertCase3(n);
}

// Case 3: the new node is not the root, and the parent is red, and the uncle is red.
// => Issue: a red parent cannot have a red child.
// => Solution: The grandparent is black (because it has red children). Recoloring the parent and
// uncle black, and the grandparent red, fixes the color issue, and keeps the black-height
// unchanged. However, the grandparent being now red might causes issues: if the grandparent is the
// root or has a red parent, then it must be black. Running the first insert case on the grandparent
// will fix this recursively.
function insertCase3(n) {
    var u = n.uncle();
    if (u & u.color === RED) {
        n.parent.color = BLACK;
        u.color = BLACK;
        var g = n.grandparent();
        g.color = RED;
        return insertCase1(g);
    }
    return insertCase4(n);
}

// Case 4: the new node is not the root, and the parent is red, and the uncle is black, and the new
// node is the right child of its parent, which is in turn the left child of the grandparent (or the
// symmetrical case: the new node is the left child of its parent, which is in turn the right child
// of the grandparent).
// => Issue: a red parent cannot have a red child (same as case 3).
// => Solution: just rotate the parent away from the new node to get the tree in the shape needed
// for case 5.
function insertCase4(n) {
    var g = n.grandparent();
    if (n === n.parent.rightChild && n.parent === g.leftChild) {
        rotateLeft(n.parent);
        return insertCase5(n.leftChild);
    }
    if (n === n.parent.leftChild && n.parent === g.rightChild) {
        rotateRight(n.parent);
        return insertCase5(n.rightChild);
    }
    return insertCase5(n);
}

// Case 5: the new node is not the root, and the parent is red, and the uncle is black, and the new
// node is the left child of its parent, which is in turn the left child of the grandparent (or the
// symmetrical case: the new node is the right child of its parent, which is in turn the right child
// of the grandparent).
// => Issue: a red parent cannot have a red child (same as cases 3 and 4).
// => Solution: rotate the grandparent away from the parent, then recolor the parent (now at the
// grandparent position) black and the grandparent (now at the uncle position) red. This fixes the
// color issue, and keeps the black-height unchanged. Done.
function insertCase5(n) {
    var g = n.grandparent();
    g.color = RED;
    n.parent.color = BLACK;
    if (n.parent === g.leftChild) {
        rotateRight(g);
    } else {
        rotateLeft(g);
    }
    if (!n.parent.parent) {
        return n.parent;
    }
    return null;
}
