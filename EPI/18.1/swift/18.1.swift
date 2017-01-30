private class Node {
    let frequency: Float
    let index: Int?
    let left: Node?
    let right: Node?

    init(frequency: Float, index: Int? = nil, left: Node? = nil, right: Node? = nil) {
        self.frequency = frequency
        self.index = index
        self.left = left
        self.right = right
    }

    func encode(prefix: String = "") -> [(index: Int, code: String)] {
        if let i = index {
            return [(i, prefix)]
        }

        let l = left?.encode(prefix: prefix + "0") ?? []
        let r = right?.encode(prefix: prefix + "1") ?? []
        return l + r
    }
}

public func encode(_ frequencies: [Float]) -> [String] {
    let nodes = Heap<Node>(higherPriority: { $0.frequency <= $1.frequency })

    for (index, frequency) in frequencies.enumerated() {
        let node = Node(frequency: frequency, index: index)
        nodes.insert(node)
    }

    while nodes.count > 1 {
        let a = nodes.removeHighestPriority()!
        let b = nodes.removeHighestPriority()!
        let combined = Node(frequency: a.frequency + b.frequency, left: a, right: b)
        nodes.insert(combined)
    }

    let root = nodes.removeHighestPriority()!

    return root
        .encode()
        .sorted { $0.index < $1.index }
        .map { $0.code }
}
