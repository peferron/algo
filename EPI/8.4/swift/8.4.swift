public class Node {
    var next: Node?
}

// cycleStart returns the node at the start of the cycle, or nil if there is no cycle.
public func cycleStart(list: Node) -> Node? {
    if let node = cycleAny(list) {
        let count = cycleCount(node)
        return cycleStart(list, cycleCount: count)
    }
    return nil
}

// cycleAny returns any node in the cycle, or nil if there is no cycle.
func cycleAny(list: Node) -> Node? {
    var slow = list
    var fast = list.next

    while let f = fast, fnn = f.next?.next {
        if slow === f {
            return slow
        }
        slow = slow.next!
        fast = fnn
    }

    return nil
}

// cycleCount returns the number of nodes in the cycle containing node.
func cycleCount(node: Node) -> Int {
    var next = node.next!
    var count = 1

    while next !== node {
        count += 1
        next = next.next!
    }

    return count
}

// cycleStart returns the first node of the cycle containing cycleCount nodes.
func cycleStart(list: Node, cycleCount: Int) -> Node {
    // Use two cursors separated by cycleCount nodes. They will point to the same node after the
    // second cursor completes a full cycle.
    var firstCursor = list
    var secondCursor = list

    for _ in 0..<cycleCount {
        secondCursor = secondCursor.next!
    }

    while firstCursor !== secondCursor {
        firstCursor = firstCursor.next!
        secondCursor = secondCursor.next!
    }

    return firstCursor
}
