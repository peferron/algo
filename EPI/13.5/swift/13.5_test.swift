// swiftlint:disable variable_name

//     1
//    / \
//   2   3
//  / \   \
// 4   5   6

let t = Node(
    value: 1,
    left: Node(
        value: 2,
        left: Node(value: 4),
        right: Node(value: 5)
    ),
    right: Node(
        value: 3,
        right: Node(value: 6)
    )
)

assert(t.lca(t)! === t)
assert(t.lca(t.left!)! === t)
assert(t.lca(t.left!.right!)! === t)
assert(t.left!.lca(t.right!)! === t)
assert(t.left!.right!.lca(t.right!)! === t)
assert(t.left!.left!.lca(t.left!.right!)! === t.left!)
assert(t.left!.lca(t.right!.right!)! === t)
assert(t.left!.right!.lca(t.right!.right!)! === t)
assert(t.lca(Node(value: 7)) === nil)
