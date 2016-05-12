import Darwin

var tests: [(int: Int, string: String)] = [
    (-1, "-1"),
    (-546, "-546"),
    (0, "0"),
    (1, "1"),
    (546, "546"),
]

for _ in 0...1000 {
    var int = 0
    arc4random_buf(&int, sizeof(Int))
    tests.append((int, String(int)))
}

for test in tests {
    var actualString = toString(test.int)
    guard actualString == test.string else {
        print("For int \(test.int) expected string to be \(test.string), but was \(actualString)")
        exit(1)
    }

    var actualInt = toInt(test.string)
    guard actualInt == test.int else {
        print("For string \(test.string) expected int to be \(test.int), but was \(actualInt)")
        exit(1)
    }
}
