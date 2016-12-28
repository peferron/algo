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
    public func isBST() -> Bool {
        var result = true
        var prev = Int.min

        depthFirstSearch { node in
            result = result && node.value >= prev
            prev = node.value
        }

        return result
    }

    private func depthFirstSearch(_ process: (Node) -> ()) {
        left?.depthFirstSearch(process)
        process(self)
        right?.depthFirstSearch(process)
    }
}
