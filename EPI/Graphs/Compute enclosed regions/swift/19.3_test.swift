import Darwin

func == <T: Equatable>(lhs: [[T]], rhs: [[T]]) -> Bool {
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

let tests: [(grid: [[Int]], filled: [[Int]])] = [
    (
        grid: [
            [0, 1],
            [1, 0],
        ],
        filled: [
            [0, 1],
            [1, 0],
        ]
    ),
    (
        grid: [
            [0, 1, 1],
            [1, 0, 1],
            [0, 1, 1],
        ],
        filled: [
            [0, 1, 1],
            [1, 1, 1],
            [0, 1, 1],
        ]
    ),
    (
        grid: [
            [1, 1, 1, 1],
            [0, 1, 0, 1],
            [1, 0, 0, 1],
            [1, 1, 1, 1],
        ],
        filled: [
            [1, 1, 1, 1],
            [0, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
        ]
    ),
]

private func intToColor(_ image: [[Int]]) -> [[Color]] {
    return image.map { $0.map { Color(rawValue: $0)! } }
}

private func colorToInt(_ image: [[Color]]) -> [[Int]] {
    return image.map { $0.map { $0.rawValue } }
}

for test in tests {
    var grid = intToColor(test.grid)
    fillEnclosed(&grid)
    let actual = colorToInt(grid)

    guard actual == test.filled else {
        print("For grid \(test.grid), expected result to be \(test.filled), but was \(actual)")
        exit(1)
    }
}
