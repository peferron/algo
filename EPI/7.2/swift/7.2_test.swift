import Darwin

let tests: [(n1: String, b1: Int, b2: Int, n2: String)] = [
    ("0", 10, 16, "0"),
    ("-1", 10, 16, "-1"),
    ("-255", 10, 16, "-FF"),
    ("1", 10, 16, "1"),
    ("255", 10, 16, "FF"),
    ("1010101101", 2, 10, "685"),
]

for test in tests {
    for (n1, b1, b2, n2) in [test, (test.n2, test.b2, test.b1, test.n1)] {
        var actual = convert(n1, fromBase: b1, toBase: b2)
        guard actual == n2 else {
            print("For number \(n1) in base \(b1), expected output in base \(b2) " +
                "to be \(n2), but was \(actual)")
            exit(1)
        }
    }
}
