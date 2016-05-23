public class Node {
    public var next: Node?

    public func merge() {
        var lastMovedEven = self
        var parentOfNextEven = self.next

        while let nextEven = parentOfNextEven?.next {
            // Move nextEven from after parentOfNextEven to after lastMovedEven.
            parentOfNextEven!.next = nextEven.next
            nextEven.next = lastMovedEven.next
            lastMovedEven.next = nextEven

            // Update positions for the next iteration.
            lastMovedEven = lastMovedEven.next!
            parentOfNextEven = parentOfNextEven!.next
        }
    }
}
