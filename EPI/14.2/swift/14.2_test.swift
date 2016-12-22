import Darwin

func == <T: Equatable>(lhs: [T?], rhs: [T?]) -> Bool {
    guard lhs.count == rhs.count else {
        return false
    }
    for (i, v) in lhs.enumerated() {
        guard v == rhs[i] else {
            return false
        }
    }
    return true
}

let tests: [(target: [Int?], source: [Int], mutatedTarget: [Int?])] = [
    (
        target: [],
        source: [],
        mutatedTarget: []
    ),
    (
        target: [1, 5],
        source: [],
        mutatedTarget: [1, 5]
    ),
    (
        target: [1, 5, nil],
        source: [],
        mutatedTarget: [1, 5, nil]
    ),
    (
        target: [nil, nil],
        source: [1, 5],
        mutatedTarget: [1, 5]
    ),
    (
        target: [nil, nil, nil],
        source: [1, 5],
        mutatedTarget: [1, 5, nil]
    ),
    (
        target: [5, 13, 17, nil, nil, nil, nil, nil],
        source: [3, 7, 11, 19],
        mutatedTarget: [3, 5, 7, 11, 13, 17, 19, nil]
    ),
]

for test in tests {
    var target = test.target
    mergeInPlace(target: &target, source: test.source)
    guard target == test.mutatedTarget else {
        print("For test target \(test.target) and source \(test.source), " +
            "expected mutated target to be \(test.mutatedTarget), but was \(target)")
        exit(1)
    }
}
