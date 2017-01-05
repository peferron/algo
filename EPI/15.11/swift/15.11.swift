public class Node {
    let value: Int
    var left: Node?
    var right: Node?

    public init(value: Int, left: Node? = nil, right: Node? = nil) {
        self.value = value
        self.left = left
        self.right = right
    }
}

extension Node {
    public func insert(_ value: Int) -> Node {
        if value < self.value {
            left = left?.insert(value) ?? Node(value: value)
        } else if value > self.value {
            right = right?.insert(value) ?? Node(value: value)
        } else {
            // The value is already present.
        }
        return self
    }

    public func remove(_ value: Int) -> Node? {
        if value < self.value {
            // The node to remove is in the left subtree.
            left = left?.remove(value)
            return self
        }

        if value > self.value {
            // The node to remove is in the right subtree.
            right = right?.remove(value)
            return self
        }

        // The node to remove is the current node.

        if left == nil {
            // Since the left subtree is empty, the right subtree is all that remains.
            return right
        }

        // Replace the current node with its predecessor. This preserves the BST property.
        let predecessor = left!.max()
        predecessor.left = left!.remove(predecessor.value)
        predecessor.right = right
        return predecessor
    }

    private func max() -> Node {
        return right?.max() ?? self
    }
}
