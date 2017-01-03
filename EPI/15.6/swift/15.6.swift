public class Node {
    let value: Int
    let left: Node?
    let right: Node?

    public init(value: Int, left: Node? = nil, right: Node? = nil) {
        self.value = value
        self.left = left
        self.right = right
    }
}

extension Node {
    public convenience init(preorder: [Int]) {
        let tree = reconstructFromPreorder(preorder, startIndex: 0, upperBound: nil).tree!
        self.init(value: tree.value, left: tree.left, right: tree.right)
    }
}

func reconstructFromPreorder(_ preorder: [Int], startIndex: Int, upperBound: Int?) -> (tree: Node?, count: Int) {
    let value = preorder[startIndex]

    let leftIndex = startIndex + 1
    let (left, leftCount) = leftIndex < preorder.count && preorder[leftIndex] < value ?
        reconstructFromPreorder(preorder, startIndex: leftIndex, upperBound: value) :
        (nil, 0)

    let rightIndex = leftIndex + leftCount
    let (right, rightCount) = rightIndex < preorder.count && (upperBound == nil || preorder[rightIndex] < upperBound!) ?
        reconstructFromPreorder(preorder, startIndex: rightIndex, upperBound: upperBound) :
        (nil, 0)

    return (tree: Node(value: value, left: left, right: right), count: 1 + leftCount + rightCount)
}
