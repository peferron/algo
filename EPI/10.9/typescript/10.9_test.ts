import {Node, traverseInOrder} from './10.9';

declare function require(name: string): any;
const assert = require('assert');

interface NumberedNode extends Node {
    value: number;
}

//     0
//    / \
//   1   2
//  / \   \
// 3   4   5
//    /
//   6

const [zero, one, two, three, four, five, six]: NumberedNode[] =
    Array.from({length: 7}, (_, i) => ({value: i}));

zero.left = one;
zero.right = two;

one.parent = zero;
one.left = three;
one.right = four;

two.parent = zero;
two.right = five;

three.parent = one;

four.parent = one;
four.left = six;

five.parent = two;

six.parent = four;

const actual: number[] = [];
traverseInOrder(zero, node => actual.push(node.value));

assert.deepStrictEqual(actual, [3, 1, 6, 4, 0, 2, 5]);
