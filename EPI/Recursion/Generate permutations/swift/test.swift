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

let tests: [(array: [Int], permutations: [[Int]])] = [
    (
        array: [],
        permutations: [
            [],
        ]
    ),
    (
        array: [10],
        permutations: [
            [10],
        ]
    ),
    (
        array: [10, 5],
        permutations: [
            [10, 5],
            [5, 10],
        ]
    ),
    (
        array: [10, 5, 3],
        permutations: [
            [10, 5, 3],
            [10, 3, 5],
            [5, 10, 3],
            [5, 3, 10],
            [3, 10, 5],
            [3, 5, 10],
        ]
    ),
]

for test in tests {
    let actual = permutations(test.array)
    guard actual == test.permutations else {
        print("For test array \(test.array), expected permutations to be \(test.permutations), " +
            "but were \(actual)")
        exit(1)
    }
}
