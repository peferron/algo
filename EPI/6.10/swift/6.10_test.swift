import Darwin

let tests: [(arrayBefore: [Int], permutation: [Int], arrayAfter: [Int])] = [
    ([], [], []),
    ([0], [0], [0]),
    ([0, 1, 2], [1, 2, 0], [2, 0, 1]),
    ([0, 1, 2, 3], [2, 1, 0, 3], [2, 1, 0, 3]),
]

for test in tests {
    var actual = test.arrayBefore
    permuteSwap(&actual, permutation: test.permutation)
    guard actual == test.arrayAfter else {
        print("For array \(test.arrayBefore) and permutation \(test.permutation), " +
            "expected final array to be \(test.arrayAfter), but was \(actual)")
        exit(1)
    }
}

for test in tests {
    var actual = test.arrayBefore
    var permutation = test.permutation
    permuteCycles(&actual, permutation: &permutation)
    guard actual == test.arrayAfter else {
        print("For array \(test.arrayBefore) and permutation \(test.permutation), " +
            "expected final array to be \(test.arrayAfter), but was \(actual)")
        exit(1)
    }
}
