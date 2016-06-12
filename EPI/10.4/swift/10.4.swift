public class Node {
    public let left: Node?
    public let right: Node?
    public var parent: Node? = nil

    public init(left: Node? = nil, right: Node? = nil) {
        self.left = left
        self.right = right

        left?.parent = self
        right?.parent = self
    }

    func depth() -> Int {
        var node = self
        var depth = 0
        while let p = node.parent {
            depth += 1
            node = p
        }
        return depth
    }

    func ancestor(depth: Int) -> Node? {
        var node = self
        for _ in 0..<depth {
            if let p = node.parent {
                node = p
            } else {
                return nil
            }
        }
        return node
    }

    public func lca(other: Node) -> Node? {
        let selfDepth = depth()
        let otherDepth = other.depth()

        var selfAncestor = ancestor(max(0, selfDepth - otherDepth))
        var otherAncestor = other.ancestor(max(0, otherDepth - selfDepth))

        while let sa = selfAncestor, oa = otherAncestor {
            if sa === oa {
                return sa
            }
            selfAncestor = sa.parent
            otherAncestor = oa.parent
        }

        return nil
    }
}
