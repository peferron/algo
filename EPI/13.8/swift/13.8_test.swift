import Darwin

let tests: [(article: [String], search: Set<String>, digest: Range<Int>?)] = [
    (
        article: [],
        search: ["abc"],
        digest: nil
    ),
    (
        article: ["abc"],
        search: ["def"],
        digest: nil
    ),
    (
        article: ["abc"],
        search: ["abc"],
        digest: 0...0
    ),
    (
        article: ["abc", "def", "ghi", "jkl", "mno"],
        search: ["abc"],
        digest: 0...0
    ),
    (
        article: ["abc", "def", "ghi", "jkl", "mno"],
        search: ["jkl", "def"],
        digest: 1...3
    ),
    (
        article: ["abc", "def", "ghi", "jkl", "mno", "def", "jkl"],
        search: ["jkl", "def"],
        digest: 5...6
    ),
]

for test in tests {
    let actual = digest(test.article, search: test.search)
    guard actual == test.digest else {
        print("For test article \(test.article) and search \(test.search), " +
            "expected range of digest to be \(test.digest), but was \(actual)")
        exit(1)
    }
}
