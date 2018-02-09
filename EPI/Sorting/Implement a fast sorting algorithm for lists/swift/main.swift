public class Node {
    public let value: Int
    public var next: Node?

    public init(value: Int, next: Node?) {
        self.value = value
        self.next = next
    }

    public func sort() -> Node {
        if next == nil {
            return self
        }

        let mid = self.middle()
        let secondHalf = mid.next!
        mid.next = nil

        let sortedFirstHalf = self.sort()
        let sortedSecondHalf = secondHalf.sort()

        return sortedFirstHalf.merge(sortedSecondHalf)
    }

    func middle() -> Node {
        var slow = self
        var fast = self

        while let fnn = fast.next?.next {
            slow = slow.next!
            fast = fnn
        }

        return slow
    }

    func merge(_ other: Node) -> Node {
        let (first, second) = self.value < other.value ? (self, other) : (other, self)
        first.next = first.next?.merge(second) ?? second
        return first
    }
}
