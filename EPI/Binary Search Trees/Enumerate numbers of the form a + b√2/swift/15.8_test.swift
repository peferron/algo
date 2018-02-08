import Darwin

extension Pair: Equatable {}

public func == (lhs: Pair, rhs: Pair) -> Bool {
    return lhs.a == rhs.a && lhs.b == rhs.b
}

let tests: [(count: Int, pairs: [Pair])] = [
    (
        count: 0,
        pairs: []
    ),
    (
        count: 1,
        pairs: [
            Pair(a: 0, b: 0),
        ]
    ),
    (
        count: 13,
        pairs: [
            Pair(a: 0, b: 0),
            Pair(a: 1, b: 0),
            Pair(a: 0, b: 1),
            Pair(a: 2, b: 0),
            Pair(a: 1, b: 1),
            Pair(a: 0, b: 2),
            Pair(a: 3, b: 0),
            Pair(a: 2, b: 1),
            Pair(a: 1, b: 2),
            Pair(a: 4, b: 0),
            Pair(a: 0, b: 3),
            Pair(a: 3, b: 1),
            Pair(a: 2, b: 2),
        ]
    ),
]

for test in tests {
    let actual = pairs(count: test.count)
    guard actual == test.pairs else {
        print("For test count \(test.count), expected pairs to be \(test.pairs), but were \(actual)")
        exit(1)
    }
}
