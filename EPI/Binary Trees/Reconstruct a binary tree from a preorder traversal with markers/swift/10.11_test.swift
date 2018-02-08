// swiftlint:disable variable_name

assert(Node<Int>(preorder: []) == nil)

let t = Node(preorder: [
    7,
        1,
            5,
                nil,
                nil,
            4,
                0,
                    nil,
                    nil,
                nil,
        2,
            nil,
            3,
                nil,
                6,
                    8,
                        nil,
                        nil,
                    nil
])!

assert(t.value == 7)
assert(t.left!.value == 1)
assert(t.left!.left!.value == 5)
assert(t.left!.right!.value == 4)
assert(t.left!.right!.left!.value == 0)
assert(t.right!.value == 2)
assert(t.right!.right!.value == 3)
assert(t.right!.right!.right!.value == 6)
assert(t.right!.right!.right!.left!.value == 8)
