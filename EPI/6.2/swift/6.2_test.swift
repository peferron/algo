import Darwin

let tests: [(numberBefore: [Int], numberAfter: [Int])] = [
    (numberBefore: [0], numberAfter: [1]),
    (numberBefore: [9], numberAfter: [1, 0]),
    (numberBefore: [1, 2, 3], numberAfter: [1, 2, 4]),
    (numberBefore: [1, 2, 9], numberAfter: [1, 3, 0]),
    (numberBefore: [1, 9, 9], numberAfter: [2, 0, 0]),
    (numberBefore: [9, 9, 9], numberAfter: [1, 0, 0, 0]),
]

for test in tests {
    var actual = test.numberBefore
    increment(&actual)
    guard actual == test.numberAfter else {
        print("For number \(test.numberBefore), " +
            "expected incremented number to be \(test.numberAfter), but was \(actual)")
        exit(1)
    }
}
