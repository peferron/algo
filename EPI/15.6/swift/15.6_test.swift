import Darwin

extension Node: CustomStringConvertible {
    public var description: String {
        return describe()
    }

    private func describe(indentation: String = "") -> String {
        let childIndentation = indentation + "  "

        let l = left?.describe(indentation: childIndentation) ?? "nil"
        let r = right?.describe(indentation: childIndentation) ?? "nil"

        return "Node(\n" +
            "\(childIndentation)value: \(self.value),\n" +
            "\(childIndentation)left: \(l),\n" +
            "\(childIndentation)right: \(r)\n" +
            "\(indentation))"
    }
}

func == (lhs: Node, rhs: Node) -> Bool {
    return lhs.value == rhs.value &&
        (lhs.left == nil && rhs.left == nil || lhs.left! == rhs.left!) &&
        (lhs.right == nil && rhs.right == nil || lhs.right! == rhs.right!)
}

let tests: [(preorder: [Int], tree: Node)] = [
    (
        preorder: [1, 2, 3],
        tree: Node(
            value: 1,
            left: nil,
            right: Node(
                value: 2,
                left: nil,
                right: Node(value: 3)
            )
        )
    ),
    (
        preorder: [1, 3, 2],
        tree: Node(
            value: 1,
            left: nil,
            right: Node(
                value: 3,
                left: Node(value: 2),
                right: nil
            )
        )
    ),
    (
        preorder: [2, 1, 3],
        tree: Node(
            value: 2,
            left: Node(value: 1),
            right: Node(value: 3)
        )
    ),
    // (
    //     preorder: [2, 3, 1],
    //     tree: impossible!
    // ),
    (
        preorder: [3, 1, 2],
        tree: Node(
            value: 3,
            left: Node(
                value: 1,
                left: nil,
                right: Node(value: 2)
            )
        )
    ),
    (
        preorder: [3, 2, 1],
        tree: Node(
            value: 3,
            left: Node(
                value: 2,
                left: Node(value: 1),
                right: nil
            ),
            right: nil
        )
    ),
    (
        preorder: [108, 106, -10, -14, 2, 107, 285, 243, 286, 401],
        tree: Node(
            value: 108,
            left: Node(
                value: 106,
                left: Node(
                    value: -10,
                    left: Node(value: -14),
                    right: Node(value: 2)
                ),
                right: Node(value: 107)
            ),
            right: Node(
                value: 285,
                left: Node(value: 243),
                right: Node(
                    value: 286,
                    left: nil,
                    right: Node(value: 401)
                )
            )
        )
    ),
]

for test in tests {
    let actual = Node(preorder: test.preorder)
    guard actual == test.tree else {
        print("For preorder traversal \(test.preorder), expected BST to be \(test.tree), " +
            "but was \(actual)")
        exit(1)
    }
}
