'use strict';

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

    // this.log = function() {
    //     log(root, 0);
    // }
};

function Node() {
    this.children = {};
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
    var c = key[0];
    var child = n.children[c];
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
    var c = key[0];
    var child = n.children[c];
    if (!child) {
        child = new Node();
        n.children[c] = child;
    }
    set(child, key.substring(1), value);
}

function del(n, key) {
    var c = key[0];
    var child = n.children[c];
    if (!child) {
        return;
    }
    if (key.length > 1) {
        del(child, key.substring(1));
        return;
    }
    // Delete this child.
    if (isEmpty(child.children)) {
        delete n.children[c];
    } else {
        child.delValue();
    }
}

function isEmpty(obj) {
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            return false;
        }
    }
    return true;
}

// function log(n, indent) {
//     var spaces = new Array(indent + 1).join(' ');
//     for (var c in n.children) {
//         if (n.children.hasOwnProperty(c)) {
//             var child = n.children[c];
//             var v = child.hasValue() ? '(' + child.value + ')' : '';
//             console.log(spaces + c + ' ' + v);
//             log(child, indent + 2);
//         }
//     }
// }
