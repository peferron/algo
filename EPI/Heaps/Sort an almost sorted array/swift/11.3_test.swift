import Darwin

let tests: [(kSorted: [Int], k: Int, sorted: [Int])] = [
    (
        kSorted: [],
        k: 10,
        sorted: []
    ),
    (
        kSorted: [3, -1, 2, 6, 4, 5, 8],
        k: 2,
        sorted: [-1, 2, 3, 4, 5, 6, 8]
    ),
]

for test in tests {
    let sorted = sort(test.kSorted, k: test.k)
    guard sorted == test.sorted else {
        print("For test k-sorted array \(test.kSorted) with k \(test.k), " +
            "expected sorted array to be \(test.sorted), but was \(sorted)")
        exit(1)
    }
}
