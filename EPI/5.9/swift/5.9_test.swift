import Darwin

let fns = [isPalindromeReverse, isPalindromeLog]

let tests: [(number: Int, isPalindrome: Bool)] = [
    (0, true),
    (1, true),
    (7, true),
    (11, true),
    (121, true),
    (333, true),
    (2147447412, true),
    (8876543210123456788, true),
    (-1, false),
    (12, false),
    (100, false),
    (8834023209094232729, false),
]

for fn in fns {
    for test in tests {
        let actual = fn(test.number)
        guard actual == test.isPalindrome else {
            print("For number \(test.number), expected isPalindrome to be \(test.isPalindrome), " +
                "but was \(actual)")
            exit(1)
        }
    }
}
