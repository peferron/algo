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

let tests: [(image: [[Int]], cell: Coord, flipped: [[Int]])] = [
    (
        image: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ],
        cell: (row: 2, col: 1),
        flipped: [
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
        ]
    ),
    (
        image: [
            [1, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ],
        cell: (row: 2, col: 1),
        flipped: [
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [1, 1, 1, 0],
            [1, 1, 1, 0],
        ]
    ),
    (
        image: [
            [1, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
        ],
        cell: (row: 1, col: 1),
        flipped: [
            [1, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
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
    var image = intToColor(test.image)
    flipRegion(test.cell, in: &image)
    let actual = colorToInt(image)

    guard actual == test.flipped else {
        print("For image \(test.image) and cell \(test.cell), " +
            "expected flipped image to be \(test.flipped), but was \(actual)")
        exit(1)
    }
}
