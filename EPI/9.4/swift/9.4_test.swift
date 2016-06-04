import Darwin

let tests: [(path: String, normalized: String)] = [
    ("/", "/"),
    ("a", "a"),
    ("/a", "/a"),
    ("a/", "a/"),
    ("/a/.", "/a"),
    ("a/..", "."),
    ("./a", "a"),
    ("../a", "../a"),
    ("../../a", "../../a"),
    ("a/b//./c/../d/../../e", "a/e"),
]

for test in tests {
    let normalized = normalize(test.path)
    guard normalized == test.normalized else {
        print("For path '\(test.path)', expected normalized to be '\(test.normalized)', " +
            "but was '\(normalized)'")
        exit(1)
    }
}
