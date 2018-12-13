public class Node {
    public let left: Node?
    public let right: Node?
    public var rightSibling: Node?

    public init(left: Node? = nil, right: Node? = nil) {
        self.left = left
        self.right = right
    }

    func inorder(_ depth: Int = 0, _ process: (Node, Int) -> Void) {
        left?.inorder(depth + 1, process)
        process(self, depth)
        right?.inorder(depth + 1, process)
    }

    public func initRightSiblings() {
        var lastNodeAtDepth = [Int: Node]()
        inorder { node, depth in
            lastNodeAtDepth[depth]?.rightSibling = node
            lastNodeAtDepth[depth] = node
        }
    }

    public func initRightSiblingsOfPerfectTree() {
        var leftMost = self
        while let nextLeftMost = leftMost.left {
            var node: Node? = leftMost
            while let n = node {
                n.left!.rightSibling = n.right
                n.right!.rightSibling = n.rightSibling?.left
                node = n.rightSibling
            }
            leftMost = nextLeftMost
        }
    }
}
