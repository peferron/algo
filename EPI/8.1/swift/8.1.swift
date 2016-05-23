public class Node {
    public let value: Int
    public var next: Node?

    public init(value: Int) {
        self.value = value
    }

    public func merge(other: Node) -> Node {
        let tempHead = Node(value: 0)
        var tail = tempHead
        var remainingSelf: Node? = self
        var remainingOther: Node? = other

        while let rs = remainingSelf, ro = remainingOther {
            if rs.value < ro.value {
                tail.next = rs
                remainingSelf = rs.next
            } else {
                tail.next = ro
                remainingOther = ro.next
            }
            tail = tail.next!
        }

        // Append the remaining nodes from either A or B (one of them must be nil).
        tail.next = remainingSelf ?? remainingOther

        return tempHead.next!
    }
}
