import Darwin

func == <T: Equatable>(lhs: [[T]], rhs: [[T]]) -> Bool {
    guard lhs.count == rhs.count else {
        return false
    }
    for (i, array) in lhs.enumerated() {
        guard array == rhs[i] else {
            return false
        }
    }
    return true
}

let tests: [(words: [String], anagrams: [[String]])] = [
    (
        words: [],
        anagrams: []
    ),
    (
        words: ["abc", "bcaa"],
        anagrams: []
    ),
    (
        words: ["abc", "bca"],
        anagrams: [
            ["abc", "bca"],
        ]
    ),
    (
        words: ["debitcard", "elvis", "silent", "badcredit", "lives", "freedom", "listen", "levis",
            "money"],
        anagrams: [
            ["debitcard", "badcredit"],
            ["elvis", "lives", "levis"],
            ["silent", "listen"],
        ]
    ),
]

for test in tests {
    let actual = anagrams(test.words).sorted { $0.first! < $1.first! }
    guard actual == test.anagrams else {
        print("For test words \(test.words), expected anagrams to be \(test.anagrams), " +
            "but were \(actual)")
        exit(1)
    }
}
