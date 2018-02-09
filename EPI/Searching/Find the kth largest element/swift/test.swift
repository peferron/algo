let tests: [(array: [Int], k: Int, element: Int)] = [
    (
        array: [0, 2, 50, 3, 4, 7, 9, 11, 5],
        k: 0,
        element: 50
    ),
    (
        array: [0, 2, 50, 3, 4, 7, 9, 11, 5],
        k: 1,
        element: 11
    ),
    (
        array: [0, 2, 50, 3, 4, 7, 9, 11, 5],
        k: 2,
        element: 9
    ),
    (
        array: [0, 2, 50, 3, 4, 7, 9, 11, 5],
        k: 7,
        element: 2
    ),
    (
        array: [0, 2, 50, 3, 4, 7, 9, 11, 5],
        k: 8,
        element: 0
    ),
]

for test in tests {
    var copy = test.array
    let element = largestInPlace(&copy, k: test.k)
    guard element == test.element else {
        print("For test array \(test.array) and k \(test.k), " +
            "expected kth largest element to be \(test.element), but was \(element)")
        exit(1)
    }
}
