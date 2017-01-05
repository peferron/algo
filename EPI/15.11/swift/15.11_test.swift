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

func test(actual: Node?, expected: Node?) {
    guard actual == nil && expected == nil ||
        actual != nil && expected != nil && actual! == expected! else {
        print("Expected tree to be \(expected), but was \(actual)")
        exit(1)
    }
}

var tree: Node? = Node(
    value: 10,
    left: Node(value: 5),
    right: Node(value: 12)
)

tree = tree!.insert(11)

test(actual: tree, expected: Node(
    value: 10,
    left: Node(value: 5),
    right: Node(
        value: 12,
        left: Node(value: 11),
        right: nil
    )
))

tree = tree!.insert(13)
tree = tree!.insert(13)
tree = tree!.insert(13)

test(actual: tree, expected: Node(
    value: 10,
    left: Node(value: 5),
    right: Node(
        value: 12,
        left: Node(value: 11),
        right: Node(value: 13)
    )
))

tree = tree!.remove(10)

test(actual: tree, expected: Node(
    value: 5,
    left: nil,
    right: Node(
        value: 12,
        left: Node(value: 11),
        right: Node(value: 13)
    )
))

tree = tree!.remove(12)

test(actual: tree, expected: Node(
    value: 5,
    left: nil,
    right: Node(
        value: 11,
        left: nil,
        right: Node(value: 13)
    )
))

tree = tree!.remove(11)

test(actual: tree, expected: Node(
    value: 5,
    left: nil,
    right: Node(value: 13)
))

tree = tree!.remove(13)

test(actual: tree, expected: Node(value: 5))

tree = tree!.remove(5)

test(actual: tree, expected: nil)
