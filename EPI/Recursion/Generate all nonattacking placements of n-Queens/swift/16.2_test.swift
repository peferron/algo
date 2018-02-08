import Darwin

func == (lhs: [Placement], rhs: [Placement]) -> Bool {
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

let tests: [(n: Int, placements: [Placement])] = [
    (
        n: 0,
        placements: [
            [],
        ]
    ),
    (
        n: 1,
        placements: [
            [0],
        ]
    ),
    (
        n: 2,
        placements: []
    ),
    (
        n: 3,
        placements: []
    ),
    (
        n: 4,
        placements: [
            [1, 3, 0, 2],
            [2, 0, 3, 1],
        ]
    ),
]

for test in tests {
    let actual = nonAttackingPlacements(n: test.n)
    guard actual == test.placements else {
        print("For test n \(test.n), expected placements to be \(test.placements), " +
            "but were \(actual)")
        exit(1)
    }
}
