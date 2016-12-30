public class Node {
    let value: Int
    let left: Node?
    let right: Node?

    public init(value: Int, left: Node? = nil, right: Node? = nil) {
        self.value = value
        self.left = left
        self.right = right
    }
}

extension Node {
    public func largest(count: Int) -> [Int] {
        var result = right?.largest(count: count) ?? []

        if result.count < count {
            result.append(self.value)
            result += left?.largest(count: count - result.count) ?? []
        }

        return result
    }

    // Iterative implementation.
    /*
    public func largest(count: Int) -> [Int] {
        var result = [Int]()
        var current: Node? = self
        var stack = [Node]()

        while result.count < count {
            if let c = current {
                stack.append(c)
                current = c.right
            } else if let last = stack.popLast() {
                result.append(last.value)
                current = last.left
            } else {
                break
            }
        }

        return result
    }
    */
}
