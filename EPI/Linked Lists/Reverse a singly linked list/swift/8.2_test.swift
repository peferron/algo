import Darwin

func nodes(_ count: Int) -> [Node] {
    let nodes = (0..<count).map { _ in Node() }
    for i in 0..<count - 1 {
        nodes[i].next = nodes[i + 1]
    }
    return nodes
}

({
    let n = nodes(1)
    let reversedHead = n[0].reverse()

    guard reversedHead === n[0] && n[0].next == nil else {
        print("Failed test with 1 node")
        exit(1)
    }
})()

({
    let n = nodes(2)
    let reversedHead = n[0].reverse()

    guard reversedHead === n[1] && n[1].next === n[0] && n[0].next === nil else {
        print("Failed test with 2 nodes")
        exit(1)
    }
})()

({
    let n = nodes(3)
    let reversedHead = n[0].reverse()

    guard reversedHead === n[2] && n[2].next === n[1] && n[1].next === n[0] &&
        n[0].next === nil else {
        print("Failed test with 3 nodes")
        exit(1)
    }
})()
