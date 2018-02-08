import Darwin

func == <T: Equatable, U: Equatable>(lhs: [(T, U)], rhs: [(T, U)]) -> Bool {
    guard lhs.count == rhs.count else {
        return false
    }
    for (i, lt) in lhs.enumerated() {
        let rt = rhs[i]
        guard lt.0 == rt.0 && lt.1 == rt.1 else {
            return false
        }
    }
    return true
}

let tests: [(string: String, occurrences: [Occurrences])] = [
    (
        string: "",
        occurrences: []
    ),
    (
        string: "a",
        occurrences: [("a", 1)]
    ),
    (
        string: "aa",
        occurrences: [("a", 2)]
    ),
    (
        string: "ab",
        occurrences: [("a", 1), ("b", 1)]
    ),
    (
        string: "ba",
        occurrences: [("a", 1), ("b", 1)]
    ),
    (
        string: "bcdacebe",
        occurrences: [("a", 1), ("b", 2), ("c", 2), ("d", 1), ("e", 2)]
    ),
]

for test in tests {
    let actual = occurrences(test.string)
    guard actual == test.occurrences else {
        print("For test string \(test.string), expected occurrences to be \(test.occurrences), " +
            "but were \(actual)")
        exit(1)
    }
}
