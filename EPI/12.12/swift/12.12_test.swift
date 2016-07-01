import Darwin

let tests: [(numbers: [Int], duplicate: Int, missing: Int)] = [
    (
        numbers: [0, 0],
        duplicate: 0,
        missing: 1
    ),
    (
        numbers: [4, 5, 2, 9, 7, 0, 1, 5, 6, 8],
        duplicate: 5,
        missing: 3
    ),
    (
        numbers: [4, 5, 2, 9, 7, 0, 1, 3, 2, 8],
        duplicate: 2,
        missing: 6
    ),
]

for test in tests {
    let actual = findDuplicateAndMissing(test.numbers)
    let expected = (duplicate: test.duplicate, missing: test.missing)
    guard actual == expected else {
        print("For test numbers \(test.numbers), " +
            "expected (duplicate, missing) to be \(expected), but was \(actual)")
        exit(1)
    }
}
