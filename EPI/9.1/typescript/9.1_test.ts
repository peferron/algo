import Stack from './9.1';

declare function require(name: string): any;
const assert = require('assert');

const stack = new Stack<number>((a, b) => a - b);

assert.strictEqual(stack.pop(), undefined);

stack.push(10);
assert.strictEqual(stack.max(), 10);

stack.push(10);
stack.push(6);
stack.push(13);
stack.push(15);
stack.push(15);
stack.push(14);
assert.strictEqual(stack.max(), 15);

assert.strictEqual(stack.pop(), 14);
assert.strictEqual(stack.max(), 15);

assert.strictEqual(stack.pop(), 15);
assert.strictEqual(stack.max(), 15);

assert.strictEqual(stack.pop(), 15);
assert.strictEqual(stack.max(), 13);

stack.push(20);
assert.strictEqual(stack.max(), 20);

assert.strictEqual(stack.pop(), 20);
assert.strictEqual(stack.max(), 13);

assert.strictEqual(stack.pop(), 13);
assert.strictEqual(stack.max(), 10);

assert.strictEqual(stack.pop(), 6);
assert.strictEqual(stack.max(), 10);

assert.strictEqual(stack.pop(), 10);
assert.strictEqual(stack.max(), 10);

assert.strictEqual(stack.pop(), 10);
assert.strictEqual(stack.pop(), undefined);
