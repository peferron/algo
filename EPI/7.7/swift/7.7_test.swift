import Darwin

let fns = [mnemonicsIterative, mnemonicsRecursive]

let tests: [(number: String, mnemonics: [String])] = [
    ("137", ["1DP", "1DQ", "1DR", "1DS", "1EP", "1EQ", "1ER", "1ES", "1FP", "1FQ", "1FR", "1FS"])
]

for fn in fns {
    for test in tests {
        var actual = fn(test.number).sort(<)
        var expected = test.mnemonics.sort(<)
        guard actual == expected else {
            print("For number \(test.number), expected mnemonics to be \(expected), " +
                "but was \(actual)")
            exit(1)
        }
    }
}
