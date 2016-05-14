import Darwin

let tests: [(index: Int, result: String)] = [
    (0, "1"),
    (1, "11"),
    (2, "21"),
    (3, "1211"),
    (4, "111221"),
    (5, "312211"),
    (6, "13112221"),
    (7, "1113213211"),
]

for test in tests {
    var actual = lookAndSay(index: test.index)
    guard actual == test.result else {
        print("For index \(test.index), expected result to be '\(test.result)', " +
            "but was '\(actual)'")
        exit(1)
    }
}
