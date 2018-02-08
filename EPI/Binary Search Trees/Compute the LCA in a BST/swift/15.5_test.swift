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

typealias NodeFn = (Node) -> Node

let tests: [(tree: Node, subTests: [(nodeA: NodeFn, nodeB: NodeFn, lca: NodeFn)])] = [
    (
        tree: Node(
            value: 10,
            left: Node(value: 5),
            right: Node(value: 15)
        ),
        subTests: [
            (
                nodeA: { $0 },
                nodeB: { $0 },
                lca: { $0 }
            ),
            (
                nodeA: { $0.left! },
                nodeB: { $0.left! },
                lca: { $0.left! }
            ),
            (
                nodeA: { $0.left! },
                nodeB: { $0.right! },
                lca: { $0 }
            ),
        ]
    ),
    (
        tree: Node(
            value: 10,
            left: Node(
                value: 5,
                left: Node(value: 4),
                right: Node(value: 6)
            ),
            right: Node(
                value: 15,
                left: Node(value: 12),
                right: Node(
                    value: 17,
                    left: Node(value: 16),
                    right: Node(value: 20)
                )
            )
        ),
        subTests: [
            (
                nodeA: { $0.left!.left! },
                nodeB: { $0.right! },
                lca: { $0 }
            ),
            (
                nodeA: { $0.left!.left! },
                nodeB: { $0.left! },
                lca: { $0.left! }
            ),
            (
                nodeA: { $0.left!.left! },
                nodeB: { $0.left!.right! },
                lca: { $0.left! }
            ),
            (
                nodeA: { $0.right!.right!.left! },
                nodeB: { $0.right!.right!.right! },
                lca: { $0.right!.right! }
            ),
            (
                nodeA: { $0.right!.right!.left! },
                nodeB: { $0.right!.left! },
                lca: { $0.right! }
            ),
            (
                nodeA: { $0.right!.right!.right! },
                nodeB: { $0.left!.right! },
                lca: { $0 }
            ),
        ]
    ),
]

for test in tests {
    for subTest in test.subTests {
        let nodeA = subTest.nodeA(test.tree)
        let nodeB = subTest.nodeB(test.tree)
        let actual = test.tree.lowestCommonAncestor(nodeA, nodeB)
        let expected = subTest.lca(test.tree)
        guard actual === expected else {
            print("For test tree \(test.tree), " +
                "expected lowest common ancestor of \(nodeA.value) and \(nodeB.value) " +
                "to be \(expected.value), but was \(actual.value)")
            exit(1)
        }
    }
}
