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

let tests: [(tree: Node, subTests: [(threshold: Int, result: (Node) -> Node?)])] = [
    (
        tree: Node(value: 1),
        subTests: [
            (threshold: -10, result: { $0 }),
            (threshold: 0, result: { $0 }),
            (threshold: 1, result: { _ in nil }),
        ]
    ),
    (
        tree: Node(
            value: 1,
            left: Node(value: 0),
            right: Node(value: 2)
        ),
        subTests: [
            (threshold: -10, result: { $0.left! }),
            (threshold: -1, result: { $0.left! }),
            (threshold: 0, result: { $0 }),
            (threshold: 1, result: { $0.right! }),
            (threshold: 2, result: { _ in nil }),
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
            (threshold: -10, result: { $0.left!.left! }),
            (threshold: 3, result: { $0.left! }),
            (threshold: 5, result: { $0.left!.right! }),
            (threshold: 6, result: { $0 }),
            (threshold: 10, result: { $0.right!.right! }),
            (threshold: 15, result: { _ in nil }),
        ]
    ),
    (
        tree: Node(
            value: 9,
            left: nil,
            right: Node(
                value: 10,
                left: Node(value: 10),
                right: nil
            )
        ),
        subTests: [
            (threshold: 9, result: { $0.right!.left! }),
        ]
    ),
]

for test in tests {
    for subTest in test.subTests {
        let actual = test.tree.lowestValueGreaterThan(subTest.threshold)
        let expected = subTest.result(test.tree)
        guard actual === expected else {
            print("For test tree \(test.tree), " +
                "expected lowest value greater than \(subTest.threshold) to be \(String(describing: expected)), " +
                "but was \(String(describing: actual))")
            exit(1)
        }
    }
}
