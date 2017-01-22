import Darwin

let tests: [(numbers: [Int], subTests: [(sum: Int, result: Bool)])] = [
    (
        numbers: [0],
        subTests: [
            (sum: 0, result: true),
            (sum: 1, result: false),
        ]
    ),
    (
        numbers: [1],
        subTests: [
            (sum: 1, result: false),
            (sum: 3, result: true)
        ]
    ),
    (
        numbers: [11, 2, 5, 7, 3],
        subTests: [
            (sum: 10, result: true),
            (sum: 21, result: true),
            (sum: 22, result: false),
            (sum: 23, result: true),
            (sum: 24, result: true),
            (sum: 25, result: true),
            (sum: 26, result: false),
        ]
    ),
]

for test in tests {
    for subTest in test.subTests {
        let actual = hasThreeSum(test.numbers, sum: subTest.sum)
        guard actual == subTest.result else {
            print("For numbers \(test.numbers) and sum \(subTest.sum), " +
                "expected result to be \(subTest.result), but was \(actual)")
            exit(1)
        }
    }
}
