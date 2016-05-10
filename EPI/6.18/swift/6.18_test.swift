import Darwin

let fns = [spiralLines, spiralSnake]

let tests: [(array: [[Int]], spiral: [Int])] = [
    (
        array: [],
        spiral: []
    ),
    (
        array: [
            [0],
        ],
        spiral: [0]
    ),
    (
        array: [
            [0, 1],
        ],
        spiral: [0, 1]
    ),
    (
        array: [
            [0],
            [1],
        ],
        spiral: [0, 1]
    ),
    (
        array: [
            [0, 1],
            [2, 3],
        ],
        spiral: [0, 1, 3, 2]
    ),
    (
        array: [
            [0, 1, 2],
        ],
        spiral: [0, 1, 2]
    ),
    (
        array: [
            [0],
            [1],
            [2],
        ],
        spiral: [0, 1, 2]
    ),
    (
        array: [
            [0, 1, 2],
            [3, 4, 5],
        ],
        spiral: [0, 1, 2, 5, 4, 3]
    ),
    (
        array: [
            [0, 1],
            [2, 3],
            [4, 5],
        ],
        spiral: [0, 1, 3, 5, 4, 2]
    ),
    (
        array: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ],
        spiral: [0, 1, 2, 5, 8, 7, 6, 3, 4]
    ),
]

for fn in fns {
    for test in tests {
        var actual = fn(test.array)
        guard actual == test.spiral else {
            print("For array \(test.array), expected spiral to be \(test.spiral), " +
                "but was \(actual)")
            exit(1)
        }
    }
}
