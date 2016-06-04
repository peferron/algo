import Darwin

var queue = Queue<Int>(capacity: 3)
assert(queue.count == 0)
assert(queue.capacity == 3)

queue.enqueue(10) // Enqueued at array[0]
assert(queue.count == 1)
assert(queue.capacity == 3)

queue.enqueue(15) // Enqueued at array[1]
assert(queue.count == 2)
assert(queue.capacity == 3)

assert(queue.dequeue() == 10) // Dequeued from array[0]
assert(queue.count == 1)
assert(queue.capacity == 3)

queue.enqueue(20) // Enqueued at array[2]
assert(queue.count == 2)
assert(queue.capacity == 3)

queue.enqueue(25) // Enqueued at array[0]
assert(queue.count == 3)
assert(queue.capacity == 3)

assert(queue.dequeue() == 15) // Dequeued from array[1]
assert(queue.count == 2)
assert(queue.capacity == 3)

queue.enqueue(30) // Enqueued at array[1]
assert(queue.count == 3)
assert(queue.capacity == 3)

queue.enqueue(35) // Triggers resize, enqueued at array[5]
assert(queue.count == 4)
assert(queue.capacity == 6)

queue.enqueue(40) // Enqueued at array[5]
assert(queue.count == 5)
assert(queue.capacity == 6)

queue.enqueue(45) // Enqueued at array[0]
assert(queue.count == 6)
assert(queue.capacity == 6)

assert(queue.dequeue() == 20)
assert(queue.dequeue() == 25)
assert(queue.dequeue() == 30)
assert(queue.dequeue() == 35)
assert(queue.dequeue() == 40)
assert(queue.dequeue() == 45)
assert(queue.count == 0)
assert(queue.capacity == 6)
