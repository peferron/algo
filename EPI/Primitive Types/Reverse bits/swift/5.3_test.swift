import Darwin

let tests: [(number: UInt16, reverse: UInt16)] = [
    (number: 0b0000000000000000, reverse: 0b0000000000000000),
    (number: 0b0000000000000001, reverse: 0b1000000000000000),
    (number: 0b1000000000000000, reverse: 0b0000000000000001),
    (number: 0b1001000100001000, reverse: 0b0001000010001001),
    (number: 0b1001111100001000, reverse: 0b0001000011111001),
]

for test in tests {
    let actual = reverse(test.number)
    guard actual == test.reverse else {
        print("For number \(test.number), expected reverse to be \(test.reverse), " +
            "but was \(actual)")
        exit(1)
    }
}
