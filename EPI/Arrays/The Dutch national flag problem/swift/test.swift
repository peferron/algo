import Darwin

let tests: [(arrayBefore: [Int], pivotIndex: Int, arrayAfter: [Int])] = [
    (
        arrayBefore: [1],
        pivotIndex: 0,
        arrayAfter: [1]
    ),
    (
        arrayBefore: [2, 1],
        pivotIndex: 0,
        arrayAfter: [1, 2]
    ),
    (
        arrayBefore: [2, 1],
        pivotIndex: 1,
        arrayAfter: [1, 2]
    ),
    (
        arrayBefore: [3, 2, 1, 2, 5],
        pivotIndex: 0,
        arrayAfter: [2, 1, 2, 3, 5]
    ),
    (
        arrayBefore: [3, 2, 1, 2, 5],
        pivotIndex: 1,
        arrayAfter: [1, 2, 2, 3, 5]
    ),
    (
        arrayBefore: [3, 2, 1, 2, 5],
        pivotIndex: 2,
        arrayAfter: [1, 2, 3, 2, 5]
    ),
    (
        arrayBefore: [3, 2, 1, 2, 5],
        pivotIndex: 4,
        arrayAfter: [3, 2, 1, 2, 5]
    ),
    (
        arrayBefore: [3, 2, 4, 6, 1, 8, 6, 6, 4, 2, -1],
        pivotIndex: 2,
        arrayAfter: [3, 2, 1, 2, -1, 4, 4, 6, 6, 8, 6]
    ),
]

for test in tests {
    var actual = test.arrayBefore
    dutchInPlace(&actual, pivotIndex: test.pivotIndex)
    guard actual == test.arrayAfter else {
        print("For array \(test.arrayBefore) and pivot index \(test.pivotIndex), " +
            "expected final array to be \(test.arrayAfter), but was \(actual)")
        exit(1)
    }
}
