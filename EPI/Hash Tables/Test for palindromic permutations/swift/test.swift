import Darwin

let tests: [(string: String, canFormPalindrome: Bool)] = [
    (
        string: "",
        canFormPalindrome: true
    ),
    (
        string: "a",
        canFormPalindrome: true
    ),
    (
        string: "aa",
        canFormPalindrome: true
    ),
    (
        string: "ab",
        canFormPalindrome: false
    ),
    (
        string: "aab",
        canFormPalindrome: true
    ),
    (
        string: "acb",
        canFormPalindrome: false
    ),
    (
        string: "edified",
        canFormPalindrome: true
    ),
    (
        string: "redified",
        canFormPalindrome: false
    ),
]

for test in tests {
    let actual = canFormPalindrome(test.string)
    guard actual == test.canFormPalindrome else {
        print("For test string \(test.string), " +
            "expected canFormPalindrome to be \(test.canFormPalindrome), but was \(actual)")
        exit(1)
    }
}
