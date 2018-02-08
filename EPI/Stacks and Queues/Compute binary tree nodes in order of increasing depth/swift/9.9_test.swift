import Darwin

func == <T: Equatable>(lhs: [[T]], rhs: [[T]]) -> Bool {
    guard lhs.count == rhs.count else {
        return false
    }
    for (index, values) in lhs.enumerated() {
        guard rhs[index] == values else {
            return false
        }
    }
    return true
}

// Tree:
//           5
//        /     \
//     42         36
//    /  \       /
//   4    12   15
//  / \       /  \
// 2   9     3    101
//                   \
//                    102

let root = Node(
    value: 5,
    left: Node(
        value: 42,
        left: Node(
            value: 4,
            left: Node(value: 2),
            right: Node(value: 9)
        ),
        right: Node(value: 12)
    ),
    right: Node(
        value: 36,
        left: Node(
            value: 15,
            left: Node(value: 3),
            right: Node(
                value: 101,
                right: Node(value: 102)
            )
        )
    )
)

let expected = [
    [5],
    [42, 36],
    [4, 12, 15],
    [2, 9, 3, 101],
    [102],
]

let actual = root.valuesByIncreasingDepth()

guard actual == expected else {
    print("Expected values in order of increasing depth to be \(expected), but were \(actual)")
    exit(1)
}
