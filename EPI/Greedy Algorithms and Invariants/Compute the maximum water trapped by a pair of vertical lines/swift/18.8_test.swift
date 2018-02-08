import Darwin

let tests: [(lineHeights: [Int], maxPair: (Int, Int))] = [
    (
        lineHeights: [0, 0],
        maxPair: (0, 1)
    ),
    (
        lineHeights: [1, 3, 3],
        maxPair: (1, 2)
    ),
    (
        lineHeights: [1, 3, 3],
        maxPair: (1, 2)
    ),
    (
        lineHeights: [2, 3, 3],
        maxPair: (0, 2)
    ),
    (
        lineHeights: [1, 2, 1, 3, 4, 4, 5, 6, 2, 1, 3, 1, 3, 2, 1, 2, 4, 1],
        maxPair: (4, 16)
    ),
]

for test in tests {
    let actual = maxPair(lineHeights: test.lineHeights)
    guard actual == test.maxPair else {
        print("For line heights \(test.lineHeights), expected max pair to be \(test.maxPair), " +
            "but was \(actual)")
        exit(1)
    }
}
