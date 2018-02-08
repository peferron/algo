import Darwin

let tests: [(values: [Int], length: Int)] = [
    (
        values: [],
        length: 0
    ),
    (
        values: [1],
        length: 1
    ),
    (
        values: [1, 3],
        length: 1
    ),
    (
        values: [1, 3, 3, 1],
        length: 1
    ),
    (
        values: [1, 2],
        length: 2
    ),
    (
        values: [1, 3, 4],
        length: 2
    ),
    (
        values: [1, 3, 2],
        length: 3
    ),
    (
        values: [3, -2, 7, 9, 8, 1, 2, 0, -1, 5, 8],
        length: 6
    ),
]

for test in tests {
    let length = largestContainedIntervalLength(test.values)
    guard length == test.length else {
        print("For test values \(test.values), " +
            "expected largest contained interval length to be \(test.length), but was \(length)")
        exit(1)
    }
}
