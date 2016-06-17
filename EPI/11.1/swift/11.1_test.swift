import Darwin

let tests: [(sequences: [[Int]], merged: [Int])] = [
    (
        sequences: [],
        merged: []
    ),
    (
        sequences: [
            [],
            [],
        ],
        merged: []
    ),
    (
        sequences: [
            [3],
            [2],
        ],
        merged: [2, 3]
    ),
    (
        sequences: [
            [1, 4, 12],
            [2, 8, 11, 15, 65],
        ],
        merged: [1, 2, 4, 8, 11, 12, 15, 65]
    ),
    (
        sequences: [
            [1, 4, 12],
            [2, 8, 11, 15, 65],
            [99],
            [],
            [1, 3, 7, 11, 80],
        ],
        merged: [1, 1, 2, 3, 4, 7, 8, 11, 11, 12, 15, 65, 80, 99]
    ),
]

for test in tests {
    let actual = merge(test.sequences)
    guard actual == test.merged else {
        print("For test sequences \(test.sequences), expected merged to be \(test.merged), " +
            "but was \(actual)")
        exit(1)
    }
}
