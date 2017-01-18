import Darwin

let tests: [(grid: [[Int]], subTests: [(sequence: [Int], contained: Bool)])] = [
    (
        grid: [],
        subTests: [
            (sequence: [], contained: true),
            (sequence: [0], contained: false),
        ]
    ),
    (
        grid: [
            [0],
        ],
        subTests: [
            (sequence: [], contained: true),
            (sequence: [0], contained: true),
            (sequence: [0, 1], contained: false),
            (sequence: [1], contained: false),
            (sequence: [1, 0], contained: false),
        ]
    ),
    (
        grid: [
            [1, 2, 3],
            [3, 4, 5],
            [5, 6, 7],
        ],
        subTests: [
            (sequence: [1, 3, 4, 6], contained: true),
            (sequence: [1, 2, 3, 4], contained: false),
            (sequence: [1, 3, 4, 6, 4, 5, 3, 2, 1, 3, 5, 3, 1], contained: true),
            (sequence: [1, 3, 4, 6, 4, 5, 3, 2, 1, 3, 5, 3, 2], contained: false),
        ]
    ),
]

for test in tests {
    for subTest in test.subTests {
        let actual = contains(grid: test.grid, sequence: subTest.sequence)
        guard actual == subTest.contained else {
            print("For grid \(test.grid) and sequence \(subTest.sequence), " +
                "expected contained to be \(subTest.contained), but was \(actual)")
            exit(1)
        }
    }
}
