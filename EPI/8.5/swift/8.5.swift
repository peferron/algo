// swiftlint:disable variable_name

public class Node {
    var next: Node?

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

public func overlappingNode(a: Node, _ b: Node) -> Node? {
    let (aTail, aCount) = a.tail()
    let (bTail, bCount) = b.tail()

    if aTail !== bTail {
        return nil
    }

    var aNode = a.next(max(aCount - bCount, 0))!
    var bNode = b.next(max(bCount - aCount, 0))!

    while aNode !== bNode {
        aNode = aNode.next!
        bNode = bNode.next!
    }

    return aNode
}
