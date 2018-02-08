import Darwin

func == (lhs: [Move], rhs: [Move]) -> Bool {
    guard lhs.count == rhs.count else {
        return false
    }
    for (i, array) in lhs.enumerated() {
        guard array == rhs[i] else {
            return false
        }
    }
    return true
}

let tests: [(count: Int, moves: [Move])] = [
    (
        count: 0,
        moves: []
    ),
    (
        count: 1,
        moves: [
            (from: .P1, to: .P2),
        ]
    ),
    (
        count: 2,
        moves: [
            (from: .P1, to: .P3),
            (from: .P1, to: .P2),
            (from: .P3, to: .P2),
        ]
    ),
    (
        count: 3,
        moves: [
            (from: .P1, to: .P2),
            (from: .P1, to: .P3),
            (from: .P2, to: .P3),
            (from: .P1, to: .P2),
            (from: .P3, to: .P1),
            (from: .P3, to: .P2),
            (from: .P1, to: .P2),
        ]
    ),
]

for test in tests {
    let actual = hanoi(count: test.count)
    guard actual == test.moves else {
        print("For test count \(test.count), expected moves to be \(test.moves), " +
            "but were \(actual)")
        exit(1)
    }
}
