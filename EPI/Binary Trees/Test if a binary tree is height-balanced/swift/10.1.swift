// swiftlint:disable conditional_binding_cascade

public class Node {
    public let left: Node?
    public let right: Node?

    public init(left: Node? = nil, right: Node? = nil) {
        self.left = left
        self.right = right
    }

    public func balanced() -> Bool {
        if case .Balanced = status(self) {
            return true
        }
        return false
    }
}

enum Status {
    case Unbalanced
    case Balanced(height: Int)
}

func status(_ tree: Node?) -> Status {
    if let t = tree {
        if case let .Balanced(leftHeight) = status(t.left),
           case let .Balanced(rightHeight) = status(t.right),
           abs(leftHeight - rightHeight) <= 1 {
            return .Balanced(height: 1 + max(leftHeight, rightHeight))
        }
        return .Unbalanced
    }
    return .Balanced(height: -1)
}
