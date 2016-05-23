public class Node {
    public var next: Node?

    // cycleStart returns the node at the start of the cycle, or nil if there is no cycle.
    public func cycleStart() -> Node? {
        if let node = self.cycleAny() {
            let count = node.cycleCount()
            return self.cycleStart(count)
        }
        return nil
    }

    // cycleAny returns any node of the cycle, or nil if there is no cycle.
    func cycleAny() -> Node? {
        var slow = self
        var fast = self.next

        while let f = fast, fnn = f.next?.next {
            if slow === f {
                return slow
            }
            slow = slow.next!
            fast = fnn
        }

        return nil
    }

    // cycleCount returns the number of nodes in the cycle containing the current node.
    func cycleCount() -> Int {
        var next = self.next!
        var count = 1

        while next !== self {
            count += 1
            next = next.next!
        }

        return count
    }

    // cycleStart returns the node at the start of the cycle containing cycleCount nodes.
    func cycleStart(cycleCount: Int) -> Node {
        // Use two cursors separated by cycleCount nodes. They will point to the same node after the
        // second cursor completes a full cycle.
        var firstCursor = self
        var secondCursor = self

        for _ in 0..<cycleCount {
            secondCursor = secondCursor.next!
        }

        while firstCursor !== secondCursor {
            firstCursor = firstCursor.next!
            secondCursor = secondCursor.next!
        }

        return firstCursor
    }
}
