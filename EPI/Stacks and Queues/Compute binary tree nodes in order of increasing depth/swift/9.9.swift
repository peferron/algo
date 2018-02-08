public class Node<T> {
    public let value: T
    public let left: Node<T>?
    public let right: Node<T>?

    public init(value: T, left: Node<T>? = nil, right: Node<T>? = nil) {
        self.value = value
        self.left = left
        self.right = right
    }

    public func valuesByIncreasingDepth() -> [[T]] {
        var values = [[T]]()

        breadthFirstSearch { depth, node in
            if values.count <= depth {
                values.append([])
            }
            values[depth].append(node.value)
        }

        return values
    }

    private func breadthFirstSearch(closure: (Int, Node<T>) -> ()) {
        // Use an array as queue for simplicity; dequeue will take linear time.
        var queue = [(0, self)]

        while !queue.isEmpty {
            let (depth, node) = queue.removeFirst()
            closure(depth, node)
            for child in [node.left, node.right] where child != nil {
                queue.append((depth + 1, child!))
            }
        }
    }
}
