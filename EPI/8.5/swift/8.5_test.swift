import Darwin

func nodes(count: Int) -> [Node] {
    let nodes = (0..<count).map { _ in Node() }
    for i in 0..<count - 1 {
        nodes[i].next = nodes[i + 1]
    }
    return nodes
}

({
    let a = nodes(4)
    let b = nodes(3)

    guard a[0].overlappingNode(b[0]) == nil && b[0].overlappingNode(a[0]) == nil else {
        print("Failed test without overlap")
        exit(1)
    }
})()

({
    let a = nodes(4)
    let b = nodes(2)
    b[1].next = a[2]

    guard a[0].overlappingNode(b[0])! === a[2] && b[0].overlappingNode(a[0]) === a[2] else {
        print("Failed test with overlap")
        exit(1)
    }
})()
