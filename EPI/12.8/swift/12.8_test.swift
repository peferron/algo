import Darwin

let tests: [(elements: [Int], min: Int, max: Int)] = [
    (
        elements: [5],
        min: 5,
        max: 5
    ),
    (
        elements: [2, 50, 3, 11, 5],
        min: 2,
        max: 50
    ),
    (
        elements: [2, 9, 50, 3, 11, 5],
        min: 2,
        max: 50
    ),
    (
        elements: [5, 3, 50, 11, 2],
        min: 2,
        max: 50
    ),
    (
        elements: [5, 3, 50, 11, 9, 2],
        min: 2,
        max: 50
    ),
]

for test in tests {
    let actual = minMax(test.elements)
    let expected = (min: test.min, max: test.max)
    guard actual == expected else {
        print("For test elements \(test.elements), expected (min, max) to be \(expected), " +
            "but was \(actual)")
        exit(1)
    }
}
