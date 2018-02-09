let tests: [(tree: Node<Int>, isSymmetric: Bool)] = [
    (
        tree: Node(value: 0),
        isSymmetric: true
    ),
    (
        tree: Node(
            value: 0,
            left: Node(
                value: 1,
                right: Node(value: 2)
            ),
            right: Node(
                value: 1,
                left: Node(value: 2)
            )
        ),
        isSymmetric: true
    ),
    (
        tree: Node(
            value: 0,
            left: Node(
                value: 1,
                right: Node(value: 2)
            ),
            right: Node(
                value: 1,
                left: Node(value: 3)
            )
        ),
        isSymmetric: false
    ),
    (
        tree: Node(
            value: 0,
            left: Node(
                value: 1,
                right: Node(value: 2)
            ),
            right: Node(
                value: 1,
                right: Node(value: 2)
            )
        ),
        isSymmetric: false
    ),
    (
        tree: Node(
            value: 0,
            left: Node(
                value: 1,
                right: Node(value: 2)
            ),
            right: Node(
                value: 1,
                left: Node(value: 2),
                right: Node(value: 3)
            )
        ),
        isSymmetric: false
    ),
]

for test in tests {
    assert(test.tree.isSymmetric() == test.isSymmetric)
}
