public class Node<T> {
    public let value: T
    public let left: Node?
    public let right: Node?

    public init(value: T, left: Node<T>?, right: Node<T>?) {
        self.value = value
        self.left = left
        self.right = right
    }

    public convenience init?(preorder: [T?]) {
        if let root = reconstruct(preorder[0..<preorder.count]).root {
            self.init(value: root.value, left: root.left, right: root.right)
        } else {
            return nil
        }
    }
}

func reconstruct<T>(preorder: ArraySlice<T?>) -> (root: Node<T>?, count: Int) {
    if preorder.isEmpty || preorder.first! == nil {
        return (nil, 1)
    }

    let left = reconstruct(preorder[preorder.startIndex + 1..<preorder.endIndex])
    let right = reconstruct(preorder[preorder.startIndex + 1 + left.count..<preorder.endIndex])

    return (
        root: Node(value: preorder.first!!, left: left.root, right: right.root),
        count: 1 + left.count + right.count
    )
}
