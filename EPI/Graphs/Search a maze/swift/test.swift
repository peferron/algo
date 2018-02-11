import Darwin

func == (lhs: [Coord], rhs: [Coord]) -> Bool {
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

let tests: [(maze: [[Int]], subTests: [(start: Coord, end: Coord, path: [Coord]?)])] = [
    (
        maze: [
            [0],
        ],
        subTests: [
            (
                start: (0, 0),
                end: (0, 0),
                path: [
                    (0, 0),
                ]
            ),
        ]
    ),
    (
        maze: [
            [0, 1],
            [0, 0],
        ],
        subTests: [
            (
                start: (0, 0),
                end: (1, 0),
                path: [
                    (0, 0),
                    (1, 0),
                ]
            ),
            (
                start: (1, 0),
                end: (1, 1),
                path: [
                    (1, 0),
                    (1, 1),
                ]
            ),
            (
                start: (0, 0),
                end: (1, 1),
                path: [
                    (0, 0),
                    (1, 0),
                    (1, 1),
                ]
            ),
            (
                start: (0, 0),
                end: (0, 1),
                path: nil
            ),
        ]
    ),
    (
        maze: [
            [0, 0, 0, 0],
            [1, 0, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 1],
        ],
        subTests: [
            (
                start: (1, 1),
                end: (2, 0),
                path: [
                    (1, 1),
                    (0, 1),
                    (0, 2),
                    (0, 3),
                    (1, 3),
                    (2, 3),
                    (2, 2),
                    (3, 2),
                    (3, 1),
                    (3, 0),
                    (2, 0),
                ]
            ),
        ]
    ),
]

for test in tests {
    for subTest in test.subTests {
        var maze: [[Status]] = test.maze.map { row in
            row.map { status in
                status == 1 ? .Blocked : .Empty
            }
        }

        let actual = path(from: subTest.start, to: subTest.end, in: &maze)

        guard actual == nil && subTest.path == nil ||
            actual != nil && subTest.path != nil && actual! == subTest.path! else {
            print("For maze \(test.maze), " +
                "expected path from \(subTest.start) to \(subTest.end) to be \(subTest.path), " +
                "but was \(actual)")
            exit(1)
        }
    }
}
