import Darwin

let tests: [(array: [Int], index: Int)] = [
    (
        array: [0],
        index: 0
    ),
    (
        array: [0, 1, 2, 3, 4],
        index: 0
    ),
    (
        array: [1, 2, 3, 4, 0],
        index: 4
    ),
    (
        array: [3, 4, 0, 1, 2],
        index: 2
    ),
]

for test in tests {
    let index = indexOfSmallest(test.array)
    guard index == test.index else {
        print("For cyclically sorted test array \(test.array), " +
            "expected index of smallest element to be \(test.index), but was \(index)")
        exit(1)
    }
}
