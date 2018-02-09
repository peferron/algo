// swiftlint:disable conditional_binding_cascade
// swiftlint:disable variable_name

public class Node<T: Equatable> {
    public let value: T
    public let left: Node?
    public let right: Node?

    public init(value: T, left: Node? = nil, right: Node? = nil) {
        self.value = value
        self.left = left
        self.right = right
    }

    public func isSymmetric() -> Bool {
        return areSymmetric(left, right)
    }
}

func areSymmetric<T>(_ a: Node<T>?, _ b: Node<T>?) -> Bool {
    if let na = a, let nb = b, na.value == nb.value &&
        areSymmetric(na.left, nb.right) && areSymmetric(na.right, nb.left) {
        return true
    }
    return a == nil && b == nil
}
