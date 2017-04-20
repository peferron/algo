import CircularQueue from './9.10';

declare function require(name: String): any;
const assert = require('assert');

const queue = new CircularQueue<number>(1);
assert.strictEqual(queue.size, 0);

queue.enqueue(10) // Enqueued at array[0]
assert.strictEqual(queue.size, 1);

queue.enqueue(15) // Enqueued at array[1]
assert.strictEqual(queue.size, 2);

assert.strictEqual(queue.dequeue(), 10); // Dequeued from array[0]
assert.strictEqual(queue.size, 1);

queue.enqueue(20) // Enqueued at array[2]
assert.strictEqual(queue.size, 2);

queue.enqueue(25) // Enqueued at array[0]
assert.strictEqual(queue.size, 3);

assert.strictEqual(queue.dequeue(), 15); // Dequeued from array[1]
assert.strictEqual(queue.size, 2);

queue.enqueue(30) // Enqueued at array[1]
assert.strictEqual(queue.size, 3);

queue.enqueue(35) // Triggers resize, enqueued at array[5]
assert.strictEqual(queue.size, 4);

queue.enqueue(40) // Enqueued at array[5]
assert.strictEqual(queue.size, 5);

queue.enqueue(45) // Enqueued at array[0]
assert.strictEqual(queue.size, 6);

assert.strictEqual(queue.dequeue(), 20);
assert.strictEqual(queue.dequeue(), 25);
assert.strictEqual(queue.dequeue(), 30);
assert.strictEqual(queue.dequeue(), 35);
assert.strictEqual(queue.dequeue(), 40);
assert.strictEqual(queue.dequeue(), 45);
assert.strictEqual(queue.dequeue(), undefined);
assert.strictEqual(queue.size, 0);
