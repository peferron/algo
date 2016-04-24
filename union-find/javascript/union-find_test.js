'use strict';

var assert = require('assert');

var UnionFind = require('./union-find.js');

var tests = [
    {
        name: 'init',
        size: 5,
        unions: [
            // 0 1 2 3 4
        ],
        expect: {
            parents: [0, 1, 2, 3, 4],
            ranks: [1, 1, 1, 1, 1],
            finds: [0, 1, 2, 3, 4]
        }
    },
    {
        name: '1-node + 1-node',
        size: 5,
        unions: [
            // 0 1 2 3 4

            [1, 2]
            // 0 1 3 4
            //   |
            //   2
        ],
        expect: {
            parents: [0, 1, 1, 3, 4],
            ranks: [1, 2, 1, 1, 1],
            finds: [0, 1, 1, 3, 4]
        }
    },
    {
        name: '1-node + 1-node, same set',
        size: 5,
        unions: [
            // 0 1 2 3 4

            [1, 2],
            // 0 1 3 4
            //   |
            //   2

            [1, 2]
            // 0 1 3 4
            //   |
            //   2
        ],
        expect: {
            parents: [0, 1, 1, 3, 4],
            ranks: [1, 2, 1, 1, 1],
            finds: [0, 1, 1 , 3 , 4]
        }
    },
    {
        name: 'root@2-node + 1-node',
        size: 5,
        unions: [
            // 0 1 2 3 4

            [1, 2],
            // 0 1 3 4
            //   |
            //   2

            [1, 3]
            // 0  1  4
            //   / \
            //  2   3
        ],
        expect: {
            parents: [0, 1, 1, 1, 4],
            ranks: [1, 2, 1, 1, 1],
            finds: [0, 1, 1, 1, 4]
        }
    },
    {
        name: '1-node + root@2-node',
        size: 5,
        unions: [
            // 0 1 2 3 4

            [1, 2],
            // 0 1 3 4
            //   |
            //   2

            [3, 1]
            // 0  1  4
            //   / \
            //  2   3
        ],
        expect: {
            parents: [0, 1, 1, 1, 4],
            ranks: [1, 2, 1, 1, 1],
            finds: [0, 1, 1, 1, 4]
        }
    },
    {
        name: 'child@2-node + 1-node',
        size: 5,
        unions: [
            // 0 1 2 3 4

            [1, 2],
            // 0 1 3 4
            //   |
            //   2

            [2, 3]
            // 0  1  4
            //   / \
            //  2   3
        ],
        expect: {
            parents: [0, 1, 1, 1, 4],
            ranks: [1, 2, 1, 1, 1],
            finds: [0, 1, 1, 1, 4]
        }
    },
    {
        name: '1-node + child@2-node',
        size: 5,
        unions: [
            // 0 1 2 3 4

            [1, 2],
            // 0 1 3 4
            //   |
            //   2

            [3, 2]
            // 0  1  4
            //   / \
            //  2   3
        ],
        expect: {
            parents: [0, 1, 1, 1, 4],
            ranks: [1, 2, 1, 1, 1],
            finds: [0, 1, 1, 1, 4]
        }
    },
    {
        name: 'root@2-node + root@2-node',
        size: 5,
        unions: [
            // 0 1 2 3 4

            [1, 2],
            // 0 1 3 4
            //   |
            //   2

            [3, 4],
            // 0 1 3
            //   | |
            //   2 4

            [1, 3]
            // 0 1
            //  / \
            // 2   3
            //     |
            //     4
        ],
        expect: {
            parents: [0, 1, 1, 1, 3],
            ranks: [1, 3, 1, 2, 1],
            finds: [0, 1, 1 , 1, 1]
        }
    },
    {
        name: 'root@3-node + root@3-node',
        size: 9,
        unions: [
            // 0 1 2 3 4 5 6 7 8

            [1, 2],
            // 0 1 3 4 5 6 7 8
            //   |
            //   2

            [3, 4],
            // 0 1 3 5 6 7 8
            //   | |
            //   2 4

            [1, 3],
            // 0 1 5 6 7 8
            //  / \
            // 2   3
            //     |
            //     4

            [5, 6],
            // 0 1   5 7 8
            //  / \  |
            // 2   3 6
            //     |
            //     4

            [7, 8],
            // 0 1   5 7
            //  / \  | |
            // 2   3 6 8
            //     |
            //     4

            [5, 7],
            // 0 1     5
            //  / \   / \
            // 2   3 6   7
            //     |     |
            //     4     8

            [1, 5]
            // 0  1
            //  / | \
            // 2  3  5
            //    |  | \
            //    4  6  7
            //          |
            //          8
        ],
        expect: {
            parents: [0, 1, 1, 1, 3, 1, 5, 5, 7],
            ranks: [1, 4, 1, 2, 1, 3, 1, 2, 1],
            finds: [0, 1, 1, 1, 1, 1, 1, 1, 1]
        }
    }
];

function runTest(test) {
    var u = new UnionFind(test.size);

    test.unions.forEach(function(tu) {
        u.union(tu[0], tu[1]);
    });

    assert.deepEqual(u.parents, test.expect.parents);
    assert.deepEqual(u.ranks, test.expect.ranks);

    for (var i = 0; i < test.size; i++) {
        var root = u.find(i);
        assert.strictEqual(root, test.expect.finds[i]);
    }

    // find() has been run against each element, so the tree should be flat now.
    assert.deepEqual(u.parents, test.expect.finds);
}

tests.forEach(runTest);
