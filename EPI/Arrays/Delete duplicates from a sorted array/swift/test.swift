import Darwin

let tests: [(before: [Int], after: [Int])] = [
    (
        before: [],
        after: []
    ),
    (
        before: [1],
        after: [1]
    ),
    (
        before: [1, 1],
        after: [1]
    ),
    (
        before: [1, 2, 3],
        after: [1, 2, 3]
    ),
    (
        before: [1, 2, 2, 3],
        after: [1, 2, 3]
    ),
    (
        before: [-1, -1, 1, 1, 2, 3, 3, 4, 5, 8, 8],
        after: [-1, 1, 2, 3, 4, 5, 8]
    ),
]

for test in tests {
    var actual = test.before
    removeDuplicates(&actual)
    guard actual == test.after else {
        print("For array \(test.before), expected deduplicated array to be \(test.after), " +
            "but was \(actual)")
        exit(1)
    }
}
