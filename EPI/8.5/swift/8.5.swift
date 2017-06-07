public class Node {
    public var next: Node?

    public func overlappingNode(_ other: Node) -> Node? {
        let (selfTail, selfCount) = tail()
        let (otherTail, otherCount) = other.tail()

        if selfTail !== otherTail {
            return nil
        }

        var selfNode = self.next(count: max(selfCount - otherCount, 0))!
        var otherNode = other.next(count: max(otherCount - selfCount, 0))!

        while selfNode !== otherNode {
            selfNode = selfNode.next!
            otherNode = otherNode.next!
        }

        return selfNode
    }


    func tail() -> (Node, Int) {
        var node = self
        var count = 1
        while let next = node.next {
            node = next
            count += 1
        }
        return (node, count)
    }

    func next(count: Int) -> Node? {
        var node = self
        for _ in 0..<count {
            if let next = node.next {
                node = next
            } else {
                return nil
            }
        }
        return node
    }
}
