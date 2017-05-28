import Queue from './9.11';

declare function require(name: string): any;
const assert = require('assert');

const queue = new Queue<number>()
assert.strictEqual(queue.length, 0);

queue.enqueue(10);
assert.strictEqual(queue.length, 1);

queue.enqueue(15);
assert.strictEqual(queue.length, 2);

assert.strictEqual(queue.dequeue(), 10)
assert.strictEqual(queue.length, 1);

queue.enqueue(20);
assert.strictEqual(queue.length, 2);

queue.enqueue(25);
assert.strictEqual(queue.length, 3);

assert.strictEqual(queue.dequeue(), 15) // Dequeued from array[1]
assert.strictEqual(queue.length, 2);

queue.enqueue(30);
assert.strictEqual(queue.length, 3);

queue.enqueue(35);
assert.strictEqual(queue.length, 4);

assert.strictEqual(queue.dequeue(), 20)
assert.strictEqual(queue.dequeue(), 25)
assert.strictEqual(queue.dequeue(), 30)
assert.strictEqual(queue.dequeue(), 35)
assert.strictEqual(queue.length, 0);
