import Darwin

let tests: [(set: [Int], powerSet: [[Int]])] = [
    (
        set: [],
        powerSet: [[]]
    ),
    (
        set: [0],
        powerSet: [[], [0]]
    ),
    (
        set: [0, 1],
        powerSet: [[], [0], [1], [0, 1]]
    ),
    (
        set: [0, 1, 2],
        powerSet: [[], [0], [1], [2], [0, 1], [0, 2], [1, 2], [0, 1, 2]]
    ),
]

for test in tests {
    let actual = Set<Set<Int>>(powerSet(test.set).map { Set<Int>($0) })
    let expected = Set<Set<Int>>(test.powerSet.map { Set<Int>($0) })
    guard actual == expected else {
        print("For test set \(test.set), expected power set to be \(expected), but was \(actual)")
        exit(1)
    }
}
