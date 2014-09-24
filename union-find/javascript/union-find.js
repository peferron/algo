'use strict';

module.exports = UnionFind;

function UnionFind(n) {
    this.parents = new Array(n);
    this.ranks = new Array(n);

    for (var i = 0; i < n; i++) {
        this.parents[i] = i;
        this.ranks[i] = 1;
    }
}

UnionFind.prototype.find = function(i) {
    var parent = this.parents[i];
    if (parent === i) {
        return i;
    }

    var root = this.find(parent);

    // Path compression: flatten the tree to speed up subsequent finds.
    // Note: There is no need to update the parent's rank here, because the asymptotical
    // complexities are maintained even if the rank is an upper bound of the height, rather than the
    // exact height.
    this.parents[i] = root;

    return root;
};

UnionFind.prototype.union = function(i, j) {
    var pi = this.find(i);
    var pj = this.find(j);

    if (pi === pj) {
        return;
    }

    // - If one tree has a strictly bigger rank than the other, the ranks can be kept unchanged by
    //   attaching the smaller tree to the root of the bigger tree.
    // - If both trees have the same rank, attaching one tree to the other increases the rank of the
    //   resulting tree by 1.
    var d = this.ranks[pi] - this.ranks[pj];
    if (d > 0) {
        this.parents[pj] = pi;
    } else if (d < 0) {
        this.parents[pi] = pj;
    } else {
        this.parents[pj] = pi;
        this.ranks[pi]++;
    }
};
