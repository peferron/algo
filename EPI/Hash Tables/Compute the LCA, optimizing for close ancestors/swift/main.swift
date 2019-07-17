public class Node: Hashable {
    public let value: Int
    public let left: Node?
    public let right: Node?
    public var parent: Node? = nil

    public init(value: Int, left: Node? = nil, right: Node? = nil) {
        self.value = value
        self.left = left
        self.right = right

        left?.parent = self
        right?.parent = self
    }

    public func lca(_ other: Node) -> Node? {
        var ancestors = Set<Node>()
        var selfAncestor: Node? = self
        var otherAncestor: Node? = other

        while selfAncestor != nil || otherAncestor != nil {
            if let sa = selfAncestor {
                if ancestors.contains(sa) {
                    return sa
                }
                ancestors.insert(sa)
                selfAncestor = sa.parent
            }

            if let oa = otherAncestor {
                if ancestors.contains(oa) {
                    return oa
                }
                ancestors.insert(oa)
                otherAncestor = oa.parent
            }
        }

        return nil
    }

    public func hash(into hasher: inout Hasher) {
        hasher.combine(value)
    }
}

public func == (lhs: Node, rhs: Node) -> Bool {
    return lhs.value == rhs.value
}
