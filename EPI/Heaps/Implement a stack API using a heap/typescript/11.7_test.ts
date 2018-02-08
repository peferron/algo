import Stack from './11.7';

declare function require(name: string): any;
const assert = require('assert');

const stack = new Stack<number>();
assert.strictEqual(stack.pop(), undefined);
stack.push(3);
stack.push(1);
stack.push(4);
stack.push(1);
assert.strictEqual(stack.pop(), 1);
assert.strictEqual(stack.pop(), 4);
stack.push(5);
stack.push(9);
assert.strictEqual(stack.pop(), 9);
assert.strictEqual(stack.pop(), 5);
assert.strictEqual(stack.pop(), 1);
assert.strictEqual(stack.pop(), 3);
assert.strictEqual(stack.pop(), undefined);
