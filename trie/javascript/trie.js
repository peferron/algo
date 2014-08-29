'use strict';

// alphabetSize, charToIndex and indexToChar are hardcoded here to keep the code short, however they
// could easily be be passed as arguments in the Trie constructor.
var alphabetSize = 36; // 0-9 and a-z
var charToIndex = function(char) {
    return parseInt(char, 36);
};
var indexToChar = function(index) {
    return index.toString(36);
};

exports.Trie = function() {
    var root = new Node();

    this.has = function(key) {
        var n = find(root, key);
        return n && n.hasValue();
    };

    this.get = function(key) {
        var n = find(root, key);
        if (n && n.hasValue()) {
            return n.value;
        }
    };

    this.set = function(key, value) {
        set(root, key, value);
    };

    this.del = function(key) {
        del(root, key);
    };

    this.all = function() {
        var a = [];
        preOrder(root, '', function(key, value) {
            a.push({key: key, value: value});
        });
        return a;
    };

    // this.log = function() {
    //     log(root, 0);
    // }
};

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
//     for (var char in n.children) {
//         if (n.children.hasOwnProperty(char)) {
//             var child = n.children[char];
//             var v = child.hasValue() ? '(' + child.value + ')' : '';
//             console.log(spaces + char + ' ' + v);
//             log(child, indent + 2);
//         }
//     }
// }
