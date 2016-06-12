public class Node<T: Hashable> {
    public let value: T
    public let left: Node?
    public let right: Node?

    public convenience init?(inorder: [T], preorder: [T]) {
        var inorderIndexes = [T: Int]()
        for (index, value) in inorder.enumerate() {
            inorderIndexes[value] = index
        }

        self.init(
            inorder: inorder[0..<inorder.count],
            preorder: preorder[0..<preorder.count],
            inorderIndexes: inorderIndexes
        )
    }

    init?(inorder: ArraySlice<T>, preorder: ArraySlice<T>, inorderIndexes: [T: Int]) {
        if inorder.isEmpty {
            return nil
        }

        self.value = preorder.first!

        let inorderRootIndex = inorderIndexes[self.value]!
        let leftCount = inorderRootIndex - inorder.startIndex
        let preorderRightStartIndex = preorder.startIndex + 1 + leftCount

        self.left = Node(
            inorder: inorder[inorder.startIndex..<inorderRootIndex],
            preorder: preorder[preorder.startIndex + 1..<preorderRightStartIndex],
            inorderIndexes: inorderIndexes
        )

        self.right = Node(
            inorder: inorder[inorderRootIndex + 1..<inorder.endIndex],
            preorder: preorder[preorderRightStartIndex..<preorder.endIndex],
            inorderIndexes: inorderIndexes
        )
    }
}
