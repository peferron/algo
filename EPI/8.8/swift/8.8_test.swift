import Darwin

({
    let (a, b, c) = (Node(), Node(), Node())
    a.next = b
    b.next = c

    let newHead = a.removeLast(0)

    guard newHead === a && a.next === b && b.next == nil else {
        print("Failed test removing last node")
        exit(1)
    }
})()

({
    let (a, b, c) = (Node(), Node(), Node())
    a.next = b
    b.next = c

    let newHead = a.removeLast(1)

    guard newHead === a && a.next === c && c.next == nil else {
        print("Failed test removing 2nd last node")
        exit(1)
    }
})()

({
    let (a, b, c) = (Node(), Node(), Node())
    a.next = b
    b.next = c

    let newHead = a.removeLast(2)

    guard newHead === b && b.next === c && c.next == nil else {
        print("Failed test removing 3rd last node")
        exit(1)
    }
})()

({
    let a = Node()

    let newHead = a.removeLast(0)

    guard newHead == nil else {
        print("Failed test removing only node")
        exit(1)
    }
})()
