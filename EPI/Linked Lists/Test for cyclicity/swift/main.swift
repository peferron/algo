public class Node {
    public var next: Node?

    // cycleStart returns the node at the start of the cycle, or nil if there is no cycle.
    public func cycleStart() -> Node? {
        if let node = self.cycleAny() {
            let count = node.cycleCount()
            return cycleStart(count)
        }
        return nil
    }

    // cycleAny returns any node of the cycle, or nil if there is no cycle.
    func cycleAny() -> Node? {
        var slow = self
        var fast = next

        while let f = fast, let fnn = f.next?.next {
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
        var node = next!
        var count = 1

        while node !== self {
            count += 1
            node = node.next!
        }

        return count
    }

    // cycleStart returns the node at the start of the cycle containing cycleCount nodes.
    func cycleStart(_ cycleCount: Int) -> Node {
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
