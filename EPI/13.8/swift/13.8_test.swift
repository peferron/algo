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
        digest: 0..<1
    ),
    (
        article: ["abc", "def", "ghi", "jkl", "mno"],
        search: ["abc"],
        digest: 0..<1
    ),
    (
        article: ["abc", "def", "ghi", "jkl", "mno"],
        search: ["jkl", "def"],
        digest: 1..<4
    ),
    (
        article: ["abc", "def", "ghi", "jkl", "mno", "def", "jkl"],
        search: ["jkl", "def"],
        digest: 5..<7
    ),
]

for test in tests {
    let actual = digest(article: test.article, search: test.search)
    guard actual == test.digest else {
        print("For test article \(test.article) and search \(test.search), " +
            "expected range of digest to be \(test.digest!), but was \(actual!)")
        exit(1)
    }
}
