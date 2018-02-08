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

let tests: [(tree: Node, isBST: Bool)] = [
    (
        tree: Node(value: 1),
        isBST: true
    ),
    (
        tree: Node(
            value: 1,
            left: Node(value: 1),
            right: Node(value: 1)
        ),
        isBST: true
    ),
    (
        tree: Node(
            value: 1,
            left: Node(value: 0),
            right: Node(value: 2)
        ),
        isBST: true
    ),
    (
        tree: Node(
            value: 1,
            left: Node(value: 0),
            right: Node(value: 0)
        ),
        isBST: false
    ),
    (
        tree: Node(
            value: 1,
            left: Node(value: 2),
            right: Node(value: 0)
        ),
        isBST: false
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
        isBST: true
    ),
    (
        tree: Node(
            value: 10,
            left: Node(
                value: 5,
                left: Node(value: 3),
                right: Node(value: 12)
            ),
            right: Node(
                value: 10,
                left: Node(value: 10),
                right: Node(value: 15)
            )
        ),
        isBST: false
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
                left: Node(value: 9),
                right: Node(value: 5)
            )
        ),
        isBST: false
    ),
]

for test in tests {
    let actual = test.tree.isBST()
    guard actual == test.isBST else {
        print("For test tree \(test.tree), expected isBST to be \(test.isBST), but was \(actual)")
        exit(1)
    }
}
