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
    // As mentioned in the book, this algorithm assumes that all values are distinct.
    public func lowestCommonAncestor(_ nodeA: Node, _ nodeB: Node) -> Node {
        var lca = self

        while true {
            if nodeA.value < lca.value && nodeB.value < lca.value {
                lca = lca.left!
            } else if nodeA.value > lca.value && nodeB.value > lca.value {
                lca = lca.right!
            } else {
                return lca
            }
        }
    }

    // Recursive implementation.
    /*
    public func lowestCommonAncestor(_ nodeA: Node, _ nodeB: Node) -> Node {
        if nodeA.value < value && nodeB.value < value {
            return left!.lowestCommonAncestor(nodeA, nodeB)
        }

        if nodeA.value > value && nodeB.value > value {
            return right!.lowestCommonAncestor(nodeA, nodeB)
        }

        return self
    }
    */
}
