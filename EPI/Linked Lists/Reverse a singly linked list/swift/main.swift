public class Node {
    public var next: Node?

    public func reverse() -> Node {
        var previous: Node?
        var current: Node? = self

        while let c = current {
            let next = c.next
            c.next = previous
            previous = current
            current = next
        }

        return previous!
    }
}
