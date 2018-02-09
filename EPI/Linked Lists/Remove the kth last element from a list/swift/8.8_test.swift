import Darwin

func nodes(_ count: Int) -> [Node] {
    let nodes = (0..<count).map { _ in Node() }
    for i in 0..<count - 1 {
        nodes[i].next = nodes[i + 1]
    }
    return nodes
}

({
    let n = nodes(3)
    let newHead = n[0].removeLast(0)

    guard newHead === n[0] && n[0].next === n[1] && n[1].next == nil else {
        print("Failed test removing last node")
        exit(1)
    }
})()

({
    let n = nodes(3)
    let newHead = n[0].removeLast(1)

    guard newHead === n[0] && n[0].next === n[2] && n[2].next == nil else {
        print("Failed test removing 2nd last node")
        exit(1)
    }
})()

({
    let n = nodes(3)
    let newHead = n[0].removeLast(2)

    guard newHead === n[1] && n[1].next === n[2] && n[2].next == nil else {
        print("Failed test removing 3rd last node")
        exit(1)
    }
})()

({
    let n = nodes(1)
    let newHead = n[0].removeLast(0)

    guard newHead == nil else {
        print("Failed test removing only node")
        exit(1)
    }
})()
