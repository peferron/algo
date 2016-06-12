// swiftlint:disable variable_name

assert(Node<Int>(inorder: [], preorder: []) == nil)

let t = Node(
    inorder: [5, 1, 0, 4, 7, 2, 3, 8, 6],
    preorder: [7, 1, 5, 4, 0, 2, 3, 6, 8]
)!

assert(t.value == 7)
assert(t.left!.value == 1)
assert(t.left!.left!.value == 5)
assert(t.left!.right!.value == 4)
assert(t.left!.right!.left!.value == 0)
assert(t.right!.value == 2)
assert(t.right!.right!.value == 3)
assert(t.right!.right!.right!.value == 6)
assert(t.right!.right!.right!.left!.value == 8)
