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
        var prevOfNodeToRemove = self

        while let next = node.next {
            node = next
            prevOfNodeToRemove = prevOfNodeToRemove.next!
        }

        prevOfNodeToRemove.next =  prevOfNodeToRemove.next!.next

        return self
    }
}
