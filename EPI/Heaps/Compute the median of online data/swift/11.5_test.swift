import Darwin

let tests: [(values: [Int], medians: [Float])] = [
    (
        values: [],
        medians: []
    ),
    (
        values: [1],
        medians: [1]
    ),
    (
        values: [1, 0, 3, 5, 2, 0, 1],
        medians: [1, 0.5, 1, 2, 2, 1.5, 1]
    ),
]

for test in tests {
    let actual = medians(test.values)
    guard actual == test.medians else {
        print("For test values \(test.values), expected medians to be \(test.medians), " +
            "but were \(actual)")
        exit(1)
    }
}
