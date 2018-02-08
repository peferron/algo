import Darwin

let tests: [(number: Int, reverse: Int)] = [
    (number: 0, reverse: 0),
    (number: 2321, reverse: 1232),
    (number: 34321, reverse: 12343),
    (number: -4892, reverse: -2984),
]

for test in tests {
    let actual = reverse(test.number)
    guard actual == test.reverse else {
        print("For number \(test.number), expected reverse to be \(test.reverse), " +
            "but was \(actual)")
        exit(1)
    }
}
