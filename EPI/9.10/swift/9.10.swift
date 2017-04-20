public struct Queue<T> {
    var array = [T]()
    var firstIndex = 0

    public var count = 0
    public var capacity: Int

    public init(capacity: Int) {
        self.array.reserveCapacity(capacity)
        self.capacity = capacity
    }

    public mutating func enqueue(_ element: T) {
        if count == capacity {
            increaseCapacity()
        }

        let enqueueIndex = (firstIndex + count) % capacity
        if enqueueIndex >= array.count {
            array.append(element)
        } else {
            array[enqueueIndex] = element
        }

        count += 1
    }

    public mutating func dequeue() -> T {
        let first = array[firstIndex]
        firstIndex = (firstIndex + 1) % capacity
        count -= 1
        return first
    }

    mutating func increaseCapacity() {
        let countAtEndOfArray = capacity - firstIndex
        let countAtStartOfArray = count - countAtEndOfArray
        array.append(contentsOf: array[0..<countAtStartOfArray])
        capacity *= 2
    }
}
