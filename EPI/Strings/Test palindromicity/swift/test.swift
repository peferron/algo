import Darwin

let fns = [isPalindromeSimple, isPalindromeSmart]

let tests: [(string: String, isPalindrome: Bool)] = [
    ("", true),
    (",!", true),
    ("a", true),
    ("a!", true),
    ("ab", false),
    ("aa", true),
    ("aba", true),
    ("  a ba", true),
    ("A man, a plan, a canal, Panama", true),
    ("A woman, a plan, a canal, Panama", false),
]

for fn in fns {
    for test in tests {
        let actual = fn(test.string)
        guard actual == test.isPalindrome else {
            print("For string \(test.string), expected isPalindrome to be \(test.isPalindrome), " +
                "but was \(actual)")
            exit(1)
        }
    }
}
