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

    func startsWith(_ prefix: Node) -> Bool {
        var currSelf: Node? = self
        var currPrefix: Node? = prefix

        while currPrefix != nil {
            if currSelf?.value != currPrefix!.value {
                return false
            }
            currSelf = currSelf!.next
            currPrefix = currPrefix!.next
        }

        return true
    }

    public func isPalindrome() -> Bool {
        let firstHalf = self
        let reversedSecondHalf = middle().reverse()
        // If the list has an even number of elements, the second half has 1 more element than the
        // first half, so testing equality doesn't work; we need to test instead that head is a
        // prefix of tail.
        let result = reversedSecondHalf.startsWith(firstHalf)
        let _ = reversedSecondHalf.reverse()
        return result
    }
}
