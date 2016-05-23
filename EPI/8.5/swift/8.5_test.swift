import Darwin

({
    let (a0, a1, a2, a3) = (Node(), Node(), Node(), Node())
    a0.next = a1
    a1.next = a2
    a2.next = a3

    let (b0, b1, b2) = (Node(), Node(), Node())
    b0.next = b1
    b1.next = b2

    guard a0.overlappingNode(b0) == nil && b0.overlappingNode(a0) == nil else {
        print("Failed test without overlap")
        exit(1)
    }
})()

({
    let (a0, a1, a2, a3) = (Node(), Node(), Node(), Node())
    a0.next = a1
    a1.next = a2
    a2.next = a3

    let b0 = Node()
    b0.next = a2

    guard a0.overlappingNode(b0)! === a2 && b0.overlappingNode(a0) === a2 else {
        print("Failed test with overlap")
        exit(1)
    }
})()
