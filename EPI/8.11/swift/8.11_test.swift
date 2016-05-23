import Darwin

func nodes(count: Int) -> [Node] {
    let nodes = (0..<count).map { _ in Node() }
    for i in 0..<count - 1 {
        nodes[i].next = nodes[i + 1]
    }
    return nodes
}

({
    let n = nodes(1)
    n[0].merge()

    guard n[0].next === nil else {
        print("Failed test with 1 nodes")
        exit(1)
    }
})()

({
    let n = nodes(2)
    n[0].merge()

    guard n[0].next === n[1] && n[1].next == nil else {
        print("Failed test with 2 nodes")
        exit(1)
    }
})()

({
    let n = nodes(3)
    n[0].merge()

    guard n[0].next === n[2] && n[2].next === n[1] && n[1].next == nil else {
        print("Failed test with 3 nodes")
        exit(1)
    }
})()

({
    let n = nodes(4)
    n[0].merge()

    guard n[0].next === n[2] && n[2].next === n[1] && n[1].next === n[3] && n[3].next == nil else {
        print("Failed test with 4 nodes")
        exit(1)
    }
})()

({
    let n = nodes(5)
    n[0].merge()

    guard n[0].next === n[2] && n[2].next === n[4] && n[4].next === n[1] && n[1].next === n[3]
        && n[3].next == nil else {
        print("Failed test with 5 nodes")
        exit(1)
    }
})()
