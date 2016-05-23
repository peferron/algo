public class Node {
    public let value: Int
    public var next: Node?

    public init(value: Int) {
        self.value = value
    }

    // See problem 8.2.
    func reverse() -> Node {
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

    func middle() -> Node {
        var slow = self
        var fast = self

        while let sn = slow.next, fnn = fast.next?.next {
            slow = sn
            fast = fnn
        }

        return slow
    }

    public func isPalindrome() -> Bool {
        if self.next == nil {
            return true
        }

        var firstHalf = self
        var reversedSecondHalf = self.middle().next?.reverse()

        while reversedSecondHalf != nil {
            guard firstHalf.value == reversedSecondHalf!.value else {
                return false
            }
            firstHalf = firstHalf.next!
            reversedSecondHalf = reversedSecondHalf!.next
        }

        return true
    }
}
