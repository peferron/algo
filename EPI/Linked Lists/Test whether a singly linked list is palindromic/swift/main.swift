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

        while let sn = slow.next, let fnn = fast.next?.next {
            slow = sn
            fast = fnn
        }

        return slow
    }

    func equals(_ other: Node) -> Bool {
        var a: Node? = self
        var b: Node? = other

        while let ax = a, let bx = b {
            if ax.value != bx.value {
                return false
            }
            a = ax.next
            b = bx.next
        }

        return true
    }

    public func isPalindrome() -> Bool {
        let firstHalf = self
        let reversedSecondHalf = middle().reverse()
        let result = reversedSecondHalf.equals(firstHalf)
        let _ = reversedSecondHalf.reverse()
        return result
    }
}
