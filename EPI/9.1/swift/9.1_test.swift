import Darwin

var stack = Stack<Int>()
assert(stack.isEmpty)

stack.push(10)
assert(!stack.isEmpty)
assert(stack.max == 10)

stack.push(10)
stack.push(6)
stack.push(13)
stack.push(15)
stack.push(15)
stack.push(14)
assert(stack.max == 15)

assert(stack.pop() == 14)
assert(stack.max == 15)

assert(stack.pop() == 15)
assert(stack.max == 15)

assert(stack.pop() == 15)
assert(stack.max == 13)

stack.push(20)
assert(stack.max == 20)

assert(stack.pop() == 20)
assert(stack.max == 13)

assert(stack.pop() == 13)
assert(stack.max == 10)

assert(stack.pop() == 6)
assert(stack.max == 10)

assert(stack.pop() == 10)
assert(stack.max == 10)

assert(stack.pop() == 10)
assert(stack.isEmpty)
