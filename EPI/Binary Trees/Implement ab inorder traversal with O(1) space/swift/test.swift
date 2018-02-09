// swiftlint:disable variable_name

//     0
//    / \
//   1   2
//  / \   \
// 3   4   5
//    /
//   6

let t = Node(
    value: 0,
    left: Node(
        value: 1,
        left: Node(value: 3),
        right: Node(
            value: 4,
            left: Node(value: 6)
        )
    ),
    right: Node(
        value: 2,
        right: Node(value: 5)
    )
)

assert(t.inorder() == [3, 1, 6, 4, 0, 2, 5])
