import Darwin

let tests: [(frequencies: [Float], codes: [String])] = [
    (
        frequencies: [30, 70],
        codes: ["0", "1"]
    ),
    (
        frequencies: [10, 70, 20],
        codes: ["00", "1", "01"]
    ),
    (
        frequencies: [10, 15, 35, 40],
        codes: ["100", "101", "11", "0"]
    ),
    (
        frequencies: [12, 5, 15, 29, 20, 25, 2],
        codes: ["1111", "11101", "110", "10", "00", "01", "11100"]
    ),
    (
        frequencies: [
            8.17, 1.49, 2.78, 4.25, 12.70, 2.23, 2.02, 6.09, 6.97, 0.15, 0.77, 4.03, 2.41, 6.75,
            7.51, 1.93, 0.10, 5.99, 6.33, 9.06, 2.76, 0.98, 2.36, 0.15, 1.97, 0.07
        ],
        codes: [
            "1110", "110000", "01001", "11111", "100", "00101", "110011", "0110", "1011",
            "001001011", "0010011", "11110", "00111", "1010", "1101", "110001", "001001001", "0101",
            "0111", "000", "01000", "001000", "00110", "001001010", "110010", "001001000"
        ]
    ),
]

for test in tests {
    let actual = encode(test.frequencies)
    guard actual == test.codes else {
        print("For frequencies \(test.frequencies), expected codes to be \(test.codes), " +
            "but were \(actual)")
        exit(1)
    }
}
