import Darwin

let tests: [(array: [Int], element: Int, index: Int?)] = [
    (
        array: [],
        element: 2,
        index: nil
    ),
    (
        array: [1],
        element: 2,
        index: nil
    ),
    (
        array: [1],
        element: 1,
        index: 0
    ),
    (
        array: [1, 2, 3],
        element: 3,
        index: 2
    ),
    (
        array: [1, 2, 3, 4, 4, 4, 4, 4, 5, 5, 6],
        element: 4,
        index: 3
    ),
]

for test in tests {
    let index = firstIndexOf(test.element, inSortedArray: test.array)
    guard test.index == nil && index == nil || index! == test.index! else {
        print("For test array \(test.array) and element \(test.element), " +
            "expected index to be \(test.index!), but was \(index!)")
        exit(1)
    }
}
