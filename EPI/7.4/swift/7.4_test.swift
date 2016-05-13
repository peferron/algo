import Darwin

let tests: [(before: String, after: String)] = [
    ("", ""),
    ("a", "dd"),
    ("b", ""),
    ("acd", "ddcd"),
    ("cda", "cddd"),
    ("cdaef", "cdddef"),
    ("bcd", "cd"),
    ("cdb", "cd"),
    ("cdbef", "cdef"),
    ("cdabef", "cdddef"),
    ("cdbaef", "cdddef"),
]

for test in tests {
    let beforeCharacters = [Character](test.before.characters)
    let beforeCount = beforeCharacters.count

    let afterCount = test.after.characters.count

    var actualCharacters = beforeCharacters
    if afterCount > beforeCount {
        actualCharacters += [Character](count: afterCount - beforeCount, repeatedValue: " ")
    }
    let actualCount = replaceAndRemove(&actualCharacters, count: beforeCount)
    var actualString = String(actualCharacters.prefix(actualCount))

    guard actualCount == afterCount && actualString == test.after else {
        print("For characters '\(test.before)' and count \(beforeCount), " +
            "expected final characters to be '\(test.after)' " +
            "and returned count to be \(afterCount), " +
            "but final characters were '\(actualString)' " +
            "and returned count was \(actualCount)")
        exit(1)
    }
}
