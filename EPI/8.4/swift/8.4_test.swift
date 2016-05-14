import Darwin

func toNodes(nexts: [Int?]) -> [Node] {
    let nodes = (0..<nexts.count).map { _ in Node() }
    for (i, next) in nexts.enumerate() where next != nil {
        nodes[i].next = nodes[next!]
    }
    return nodes
}

let tests: [(nexts: [Int?], cycleStartIndex: Int?)] = [
    ([nil], nil),
    ([1, 2, nil], nil),
    ([0], 0),
    ([1, 0], 0),
    ([1, 2, 1], 1),
    ([1, 2, 3, 4, 5, 6, 0], 0),
    ([1, 2, 3, 4, 5, 6, 2], 2),
    ([1, 2, 3, 4, 5, 6, 4], 4),
    ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 6], 6),
]

for test in tests {
    let nodes = toNodes(test.nexts)
    let actualCycleStart = cycleStart(nodes.first!)
    let actual = actualCycleStart == nil ? nil : nodes.indexOf { $0 === actualCycleStart! }

    guard actual == nil && test.cycleStartIndex == nil ||
        actual != nil && test.cycleStartIndex != nil && actual! == test.cycleStartIndex! else {
        print("For nexts \(test.nexts), expected cycleStartIndex to be \(test.cycleStartIndex), " +
            "but was \(actual)")
        exit(1)
    }
}
