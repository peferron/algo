let tests: [(tree: Node, balanced: Bool)] = [
    (
        tree: Node(),
        balanced: true
    ),
    (
        tree: Node(
            left: Node()
        ),
        balanced: true
    ),
    (
        tree: Node(
            left: Node()
        ),
        balanced: true
    ),
    (
        // Case where the root is unbalanced.
        tree: Node(
            left: Node(
                left: Node()
            )
        ),
        balanced: false
    ),
    (
        // Case where the root is balanced, but one of the subtrees is not.
        tree: Node(
            left: Node(
                left: Node(),
                right: Node()
            ),
            right: Node(
                left: Node(
                    right: Node()
                )
            )
        ),
        balanced: false
    ),
    (
        // Same as above, but the subtree has been balanced.
        tree: Node(
            left: Node(
                left: Node(),
                right: Node()
            ),
            right: Node(
                left: Node(
                    right: Node()
                ),
                right: Node()
            )
        ),
        balanced: true
    ),
]

for test in tests {
    assert(test.tree.balanced() == test.balanced)
}
