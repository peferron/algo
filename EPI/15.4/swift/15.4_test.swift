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

let tests: [(tree: Node, subTests: [(count: Int, result: [Int])])] = [
    (
        tree: Node(value: 1),
        subTests: [
            (count: 0, result: []),
            (count: 1, result: [1]),
            (count: 10, result: [1]),
        ]
    ),
    (
        tree: Node(
            value: 1,
            left: Node(value: 0),
            right: Node(value: 2)
        ),
        subTests: [
            (count: 1, result: [2]),
            (count: 2, result: [2, 1]),
            (count: 3, result: [2, 1, 0]),
            (count: 10, result: [2, 1, 0]),
        ]
    ),
    (
        tree: Node(
            value: 10,
            left: Node(
                value: 5,
                left: Node(value: 3),
                right: Node(value: 6)
            ),
            right: Node(
                value: 10,
                left: Node(value: 10),
                right: Node(value: 15)
            )
        ),
        subTests: [
            (count: 1, result: [15]),
            (count: 2, result: [15, 10]),
            (count: 3, result: [15, 10, 10]),
            (count: 4, result: [15, 10, 10, 10]),
            (count: 7, result: [15, 10, 10, 10, 6, 5, 3]),
            (count: 10, result: [15, 10, 10, 10, 6, 5, 3]),
        ]
    ),
]

for test in tests {
    for subTest in test.subTests {
        let actual = test.tree.largest(count: subTest.count)
        guard actual == subTest.result else {
            print("For test tree \(test.tree), " +
                "expected \(subTest.count) largest values to be \(subTest.result), " +
                "but were \(actual)")
            exit(1)
        }
    }
}
