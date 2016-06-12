// swiftlint:disable variable_name

//     x
//    / \
//   x   x
//  / \   \
// x   x   x

let t = Node(
    left: Node(
        left: Node(),
        right: Node()
    ),
    right: Node(
        right: Node()
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
assert(t.lca(Node()) === nil)
