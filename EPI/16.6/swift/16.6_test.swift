import Darwin

let tests: [(pairs: Int, matchedParens: [String])] = [
    (
        pairs: 0,
        matchedParens: [
            "",
        ]
    ),
    (
        pairs: 1,
        matchedParens: [
            "()",
        ]
    ),
    (
        pairs: 2,
        matchedParens: [
            "(())",
            "()()",
        ]
    ),
    (
        pairs: 3,
        matchedParens: [
            "((()))",
            "(()())",
            "(())()",
            "()(())",
            "()()()",
        ]
    ),
    (
        pairs: 4,
        matchedParens: [
            "(((())))",
            "((()()))",
            "((())())",
            "((()))()",
            "(()(()))",
            "(()()())",
            "(()())()",
            "(())(())",
            "(())()()",
            "()((()))",
            "()(()())",
            "()(())()",
            "()()(())",
            "()()()()",
        ]
    ),
]

for test in tests {
    let actual = matchedParens(pairs: test.pairs)
    guard actual == test.matchedParens else {
        print("For \(test.pairs) pairs, expected matched parens to be \(test.matchedParens), " +
            "but were \(actual)")
        exit(1)
    }
}
