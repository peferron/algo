import Darwin

let tests: [(bitCount: Int, grayCode: [Int])] = [
    (
        bitCount: 0,
        grayCode: [
            0b0
        ]
    ),
    (
        bitCount: 1,
        grayCode: [
            0b0,
            0b1
        ]
    ),
    (
        bitCount: 2,
        grayCode: [
            0b00,
            0b01,
            0b11,
            0b10,
        ]
    ),
    (
        bitCount: 3,
        grayCode: [
            0b000,
            0b001,
            0b011,
            0b010,
            0b110,
            0b111,
            0b101,
            0b100,
        ]
    ),
]

for test in tests {
    let actual = grayCode(bitCount: test.bitCount)
    guard actual == test.grayCode else {
        print("For bit count \(test.bitCount), expected gray code to be \(test.grayCode), " +
            "but was \(actual)")
        exit(1)
    }
}
