import Darwin

let tests: [(roman: String, int: Int)] = [
    ("", 0),
    ("I", 1),
    ("III", 3),
    ("IV", 4),
    ("VI", 6),
    ("XXXXXIIIIIIIII", 59),
    ("LVIIII", 59),
    ("LIX", 59),
    ("MDC", 1600),
    ("CMCD", 1300),
]

for test in tests {
    var actual = toInt(roman: test.roman)
    guard actual == test.int else {
        print("For roman '\(test.roman)', expected int to be \(test.int), but was \(actual)")
        exit(1)
    }
}
