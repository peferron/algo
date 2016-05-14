// swiftlint:disable variable_name

public class Node {
    let value: Int
    var next: Node?

    init(value: Int) {
        self.value = value
    }
}

public func merge(a: Node, _ b: Node) -> Node {
    let tempHead = Node(value: 0)
    var tail = tempHead
    var remainingA: Node? = a
    var remainingB: Node? = b

    while let rA = remainingA, rB = remainingB {
        if rA.value < rB.value {
            tail.next = rA
            remainingA = rA.next
        } else {
            tail.next = rB
            remainingB = rB.next
        }
        tail = tail.next!
    }

    // Append the remaining nodes from either A or B (one of them must be nil).
    tail.next = remainingA ?? remainingB

    return tempHead.next!
}
