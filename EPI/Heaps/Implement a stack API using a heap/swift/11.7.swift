class Stack<T> {
    let maxIndexHeap = Heap<(index: Int, value: T)> { $0.index > $1.index }

    func push(_ element: T) {
        maxIndexHeap.insert((index: maxIndexHeap.count, value: element))
    }

    func pop() -> T? {
        return maxIndexHeap.removeHighestPriority()?.value
    }
}
