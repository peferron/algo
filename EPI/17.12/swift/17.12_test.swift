import Darwin

let tests: [(sequence: [Int], longestNondecreasingSubsequenceLength: Int)] = [
    (
        sequence: [],
        longestNondecreasingSubsequenceLength: 0
    ),
    (
        sequence: [10],
        longestNondecreasingSubsequenceLength: 1
    ),
    (
        sequence: [10, 9],
        longestNondecreasingSubsequenceLength: 1
    ),
    (
        sequence: [9, 10],
        longestNondecreasingSubsequenceLength: 2
    ),
    (
        sequence: [10, 10],
        longestNondecreasingSubsequenceLength: 2
    ),
    (
        sequence: [3, 0, 4, 2, 3, 5],
        longestNondecreasingSubsequenceLength: 4
    ),
    (
        sequence: [0, 8, 4, 12, 2, 10, 6, 14, 1, 9],
        longestNondecreasingSubsequenceLength: 4
    ),
]

for test in tests {
    let actual = longestNondecreasingSubsequenceLength(test.sequence)
    guard actual == test.longestNondecreasingSubsequenceLength else {
        print("For sequence \(test.sequence), expected length of longest subsequence to be " +
            "\(test.longestNondecreasingSubsequenceLength), but was \(actual)")
        exit(1)
    }
}
