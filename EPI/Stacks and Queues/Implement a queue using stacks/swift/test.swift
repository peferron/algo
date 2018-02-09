import Darwin

var queue = Queue<Int>()
assert(queue.count == 0)

queue.enqueue(10)
assert(queue.count == 1)

queue.enqueue(15)
assert(queue.count == 2)

assert(queue.dequeue() == 10)
assert(queue.count == 1)

queue.enqueue(20)
assert(queue.count == 2)

queue.enqueue(25)
assert(queue.count == 3)

assert(queue.dequeue() == 15) // Dequeued from array[1]
assert(queue.count == 2)

queue.enqueue(30)
assert(queue.count == 3)

queue.enqueue(35)
assert(queue.count == 4)

assert(queue.dequeue() == 20)
assert(queue.dequeue() == 25)
assert(queue.dequeue() == 30)
assert(queue.dequeue() == 35)
assert(queue.count == 0)
