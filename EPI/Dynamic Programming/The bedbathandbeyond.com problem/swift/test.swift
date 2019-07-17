import Darwin

let tests: [(name: String, dictionary: Set<String>, decomposition: [String]?)] = [
    (
        name: "",
        dictionary: Set(["a", "b"]),
        decomposition: []
    ),
    (
        name: "oneword",
        dictionary: Set(["oneword", "anotherword"]),
        decomposition: ["oneword"]
    ),
    (
        name: "bedbathandbeyond",
        dictionary: Set(["and", "bath", "bed", "beyond", "hand"]),
        decomposition: ["bed", "bath", "and", "beyond"]
    ),
    (
        name: "bedbathandbeyond",
        dictionary: Set(["and", "bat", "bed", "beyond", "hand"]),
        decomposition: ["bed", "bat", "hand", "beyond"]
    ),
    (
        name: "bedbathandbeyond",
        dictionary: Set(["and", "bat", "bath", "bed", "hand"]),
        decomposition: nil
    ),
    (
        name: "amanaplanacanal",
        dictionary: Set(["a", "canal", "man", "plan"]),
        decomposition: ["a", "man", "a", "plan", "a", "canal"]
    ),
]

for test in tests {
    let actual = decompose(test.name, dictionary: test.dictionary)
    guard actual == nil && test.decomposition == nil ||
        actual != nil && test.decomposition != nil && actual! == test.decomposition! else {
        print("For name \(test.name) and dictionary \(test.dictionary), " +
            "expected decomposition to be \(String(describing: test.decomposition)), " +
            "but was \(String(describing: actual))")
        exit(1)
    }
}
