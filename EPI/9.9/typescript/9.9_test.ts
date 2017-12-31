import {Node, getNodesByDepth} from './9.9';

declare function require(name: string): any;
const assert = require('assert');

// Tree:
//           A
//         /   \
//       B       C
//      / \     /
//     D   E   F
//    / \     / \
//   G   H   I   J
//                \
//                 K

const [A, B, C, D, E, F, G, H, I, J, K]: Node[] = Array.from({length: 11}, () => ({}));

A.left = B;
A.right = C;

B.left = D;
B.right = E;

D.left = G;
D.right = H;

C.left = F;

F.left = I;
F.right = J;

J.right = K;

const actual = getNodesByDepth(A);

const expected = [
    [A],
    [B, C],
    [D, E, F],
    [G, H, I, J],
    [K]
];

assert.deepStrictEqual(actual, expected);
