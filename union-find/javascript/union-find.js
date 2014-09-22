'use strict';

module.exports = UnionFind;

function UnionFind(n) {
    this.parents = new Array(n);
    this.sizes = new Array(n);
    for (var i = 0; i < n; i++) {
        this.parents[i] = i;
        this.sizes[i] = 1;
    }
}

UnionFind.prototype.find = function(i) {
    var parent = this.parents[i];
    if (parent === i) {
        return i;
    }

    var root = this.find(parent);

    // Flatten the tree to speed up subsequent finds.
    this.parents[i] = root;

    return root;
};

UnionFind.prototype.union = function(i, j) {
    var pi = this.find(i);
    var pj = this.find(j);

    if (pi === pj) {
        return;
    }

    if (this.sizes[pi] >= this.sizes[pj]) {
        merge(this, pi, pj);
    } else {
        merge(this, pj, pi);
    }
};

function merge(u, dst, src) {
    u.parents[src] = dst;
    u.sizes[dst] += u.sizes[src];
}
