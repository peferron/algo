// swiftlint:disable variable_name

({
    //     x
    //    / \
    //   x   x
    //  / \   \
    // x   x   x
    //    /
    //   x

    let t = Node(
        left: Node(
            left: Node(),
            right: Node(
                left: Node()
            )
        ),
        right: Node(
            right: Node()
        )
    )

    t.initRightSiblings()

    assert(t.rightSibling == nil)
    assert(t.left!.rightSibling! === t.right!)
    assert(t.left!.left!.rightSibling! === t.left!.right!)
    assert(t.left!.right!.rightSibling! === t.right!.right!)
    assert(t.left!.right!.left!.rightSibling == nil)
    assert(t.right!.rightSibling == nil)
    assert(t.right!.right!.rightSibling == nil)
})()

({
    //      x
    //    /   \
    //   x     x
    //  / \   / \
    // x   x x   x

    let t = Node(
        left: Node(
            left: Node(),
            right: Node()
        ),
        right: Node(
            left: Node(),
            right: Node()
        )
    )

    t.initRightSiblingsOfPerfectTree()

    assert(t.rightSibling == nil)
    assert(t.left!.rightSibling! === t.right!)
    assert(t.left!.left!.rightSibling! === t.left!.right!)
    assert(t.left!.right!.rightSibling! === t.right!.left!)
    assert(t.right!.rightSibling == nil)
    assert(t.right!.left!.rightSibling! === t.right!.right!)
    assert(t.right!.right!.rightSibling == nil)
})()



