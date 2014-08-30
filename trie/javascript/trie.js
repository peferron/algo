'use strict';

module.exports = Trie;

// alphabetSize, charToIndex and indexToChar are hardcoded here to keep the code short, however they
// could easily be be passed as arguments to the Trie constructor.
var alphabetSize = 36; // 0-9 and a-z
var charToIndex = function(char) { return parseInt(char, 36); };
var indexToChar = function(index) { return index.toString(36); };

function Trie() {
    this.root = new Node();
}

Trie.prototype.has = function(key) {
    var n = find(this.root, key);
    return n && n.hasValue();
};

Trie.prototype.get = function(key) {
    var n = find(this.root, key);
    if (n && n.hasValue()) {
        return n.value;
    }
};

Trie.prototype.set = function(key, value) {
    set(this.root, key, value);
};

Trie.prototype.del = function(key) {
    del(this.root, key);
};

Trie.prototype.all = function() {
    var a = [];
    preOrder(this.root, '', function(key, value) {
        a.push({key: key, value: value});
    });
    return a;
};

// Trie.prototype.log = function() {
//     log(this.root, 0);
// };

function Node() {
    this.children = new Array(alphabetSize);
}

Node.prototype.hasValue = function() {
    return this.hasOwnProperty('value');
};

Node.prototype.delValue = function() {
    delete this.value;
};

function find(n, key) {
    if (!key) {
        return n;
    }
    var i = charToIndex(key[0]);
    var child = n.children[i];
    if (!child) {
        return null;
    }
    return find(child, key.substring(1));
}

function set(n, key, value) {
    if (!key) {
        n.value = value;
        return;
    }
    var i = charToIndex(key[0]);
    var child = n.children[i];
    if (!child) {
        child = new Node();
        n.children[i] = child;
    }
    set(child, key.substring(1), value);
}

function del(n, key) {
    var i = charToIndex(key[0]);
    var child = n.children[i];
    if (!child) {
        return;
    }
    if (key.length > 1) {
        del(child, key.substring(1));
        return;
    }
    // Delete this child.
    if (isEmpty(child.children)) {
        n.children[i] = null;
    } else {
        child.delValue();
    }
}

function preOrder(n, key, callback) {
    if (n.hasValue()) {
        callback(key, n.value);
    }
    n.children.forEach(function(child, i) {
        if (child) {
            preOrder(child, key + indexToChar(i), callback);
        }
    });
}

function isEmpty(a) {
    return a.every(function(x) {
        return !x;
    });
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
