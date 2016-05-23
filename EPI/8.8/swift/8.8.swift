public class Node {
    public var next: Node?

    public func removeLast(index: Int) -> Node? {
        var node = self
        for _ in 0..<index {
            node = node.next!
        }

        if node.next == nil {
            // The index-th last node is the first node.
            return self.next
        }

        node = node.next!
        var parentOfNodeToRemove = self

        while let next = node.next {
            node = next
            parentOfNodeToRemove = parentOfNodeToRemove.next!
        }

        parentOfNodeToRemove.next =  parentOfNodeToRemove.next!.next

        return self
    }
}
