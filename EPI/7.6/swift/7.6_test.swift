import Darwin

let fns = [reverseWordsSimple, reverseWordsSmart]

let tests: [(before: String, after: String)] = [
    ("", ""),
    ("a", "a"),
    ("ab", "ab"),
    ("ab c", "c ab"),
    ("bla blah blahhhh", "blahhhh blah bla"),
]

for fn in fns {
    for test in tests {
        var actualCharacters = [Character](test.before)
        fn(&actualCharacters)
        let actualString = String(actualCharacters)
        guard actualString == test.after else {
            print("For string '\(test.before)', expected final string to be '\(test.after)', " +
                "but was '\(actualString)'")
            exit(1)
        }
    }
}
