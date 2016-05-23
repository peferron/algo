import Darwin

({
    let a = Node()

    let reversedHead = reverse(a)

    guard reversedHead === a && a.next == nil else {
        print("Failed test with 1 node")
        exit(1)
    }
})()

({
    let (a, b, c) = (Node(), Node(), Node())
    a.next = b
    b.next = c

    let reversedHead = reverse(a)

    guard reversedHead === c && c.next === b && b.next === a && a.next === nil else {
        print("Failed test with 3 nodes")
        exit(1)
    }
})()
