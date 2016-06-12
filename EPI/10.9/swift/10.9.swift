// swiftlint:disable conditional_binding_cascade

public class Node<T> {
    public let value: T
    public let left: Node?
    public let right: Node?
    public var parent: Node? = nil

    public init(value: T, left: Node? = nil, right: Node? = nil) {
        self.value =  value
        self.left = left
        self.right = right

        left?.parent = self
        right?.parent = self
    }

    public func inorder() -> [T] {
        var values = [T]()
        var current: Node? = self
        var previous: Node? = nil

        while let c = current {
            if let p = previous, let l = c.left where p === l {
                // Coming back up from the left child.
                values.append(c.value)
                current = c.right ?? c.parent
            } else if let p = previous, let r = c.right where p === r {
                // Coming back up from the right child.
                current = c.parent
            } else {
                // Coming down from the parent.
                if let l = c.left {
                    current = l
                } else {
                    values.append(c.value)
                    current = c.right ?? c.parent
                }
            }
            previous = c
        }

        return values
    }
}
