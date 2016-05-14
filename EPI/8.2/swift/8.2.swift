public class Node {
    var next: Node?
}

public func reverse(head: Node) -> Node {
    var previous: Node?
    var current: Node? = head

    while let c = current {
        let next = c.next
        c.next = previous
        previous = current
        current = next
    }

    return previous!
}
