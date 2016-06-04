// Nerfed array to make sure we don't cheat by doing e.g. index-based access.
struct Stack<T> {
    var array = [T]()

    var count: Int {
        return array.count
    }

    mutating func push(element: T) {
        array.append(element)
    }

    mutating func pop() -> T {
        return array.removeLast()
    }
}

public struct Queue<T> {
    var enqueueStack = Stack<T>()
    var dequeueStack = Stack<T>()

    public var count: Int {
        return enqueueStack.count + dequeueStack.count
    }

    public mutating func enqueue(element: T) {
        enqueueStack.push(element)
    }

    public mutating func dequeue() -> T {
        if dequeueStack.count == 0 {
            while enqueueStack.count > 0 {
                dequeueStack.push(enqueueStack.pop())
            }
        }
        return dequeueStack.pop()
    }
}
