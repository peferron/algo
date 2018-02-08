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
    arc4random_buf(&int, MemoryLayout<Int>.size)
    tests.append((int, String(int)))
}

for test in tests {
    let actualString = toString(test.int)
    guard actualString == test.string else {
        print("For int \(test.int) expected string to be \(test.string), but was \(actualString)")
        exit(1)
    }

    let actualInt = toInt(test.string)
    guard actualInt == test.int else {
        print("For string \(test.string) expected int to be \(test.int), but was \(actualInt)")
        exit(1)
    }
}
