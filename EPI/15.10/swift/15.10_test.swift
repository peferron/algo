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

let tests: [(sortedValues: [Int], tree: Node)] = [
    (
        sortedValues: [1, 2, 3],
        tree: Node(
            value: 2,
            left: Node(value: 1),
            right: Node(value: 3)
        )
    ),
    (
        sortedValues: [2, 3, 5, 7, 11, 13, 17, 19, 23],
        tree: Node(
            value: 11,
            left: Node(
                value: 3,
                left: Node(value: 2),
                right: Node(
                    value: 5,
                    left: nil,
                    right: Node(value: 7)
                )
            ),
            right: Node(
                value: 17,
                left: Node(value: 13),
                right: Node(
                    value: 19,
                    left: nil,
                    right: Node(value: 23)
                )
            )
        )
    ),
]

for test in tests {
    let actual = Node(sortedValues: test.sortedValues)
    guard actual == test.tree else {
        print("For sorted values \(test.sortedValues), " +
            "expected minimum-height ST to be \(test.tree), but was \(actual)")
        exit(1)
    }
}
