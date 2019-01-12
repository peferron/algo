export default class UnionFind {
    constructor(n) {
        this.parents = new Array(n);
        this.ranks = new Array(n);
        for (let i = 0; i < n; i += 1) {
            this.parents[i] = i;
            this.ranks[i] = 1;
        }
    }

    find(i) {
        const parent = this.parents[i];
        if (parent === i) {
            return i;
        }
        const root = this.find(parent);
        // Path compression: flatten the tree to speed up subsequent finds.
        // Note: There is no need to update the parent's rank here, because the asymptotical complexities are maintained
        // even if the rank is an upper bound of the height, rather than the exact height.
        this.parents[i] = root;
        return root;
    }

    union(i, j) {
        const pi = this.find(i);
        const pj = this.find(j);
        if (pi === pj) {
            return;
        }
        // - If one tree has a strictly bigger rank than the other, the ranks can be kept unchanged by attaching the
        //   smaller tree to the root of the bigger tree.
        // - If both trees have the same rank, attaching one tree to the other increases the rank of the resulting tree
        //   by 1.
        const d = this.ranks[pi] - this.ranks[pj];
        if (d > 0) {
            this.parents[pj] = pi;
        } else if (d < 0) {
            this.parents[pi] = pj;
        } else {
            this.parents[pj] = pi;
            this.ranks[pi] += 1;
        }
    }
}
