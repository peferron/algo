import {Node, fillNext} from './main';

declare function require(name: string): any;
const assert = require('assert');

//      x
//    /   \
//   x     x
//  / \   / \
// x   x x   x

const tree: Node = {
    left: {
        left: {},
        right: {}
    },
    right: {
        left: {},
        right: {}
    }
};

fillNext(tree);

assert.strictEqual(tree.next, undefined);

assert.strictEqual(tree.left!.next, tree.right);
assert.strictEqual(tree.right!.next, undefined);

assert.strictEqual(tree.left!.left!.next, tree.left!.right);
assert.strictEqual(tree.left!.right!.next, tree.right!.left);
assert.strictEqual(tree.right!.left!.next, tree.right!.right);
assert.strictEqual(tree.right!.right!.next, undefined);
