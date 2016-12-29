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

        // An obvious improvement here would be to abort the DFS as soon as `result` turns false.
        // One solution would be to return a Bool in the closure, instead of void: `true` would
        // continue the DFS, and `false` would abort it.
        // A much more idiomatic solution would be to change the `depthFirstSearch` function to
        // return an iterator (lazy sequence) instead. Then we could just run a plain `for` loop
        // over this iterator, and `break` out of it when the BST test fails.
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
