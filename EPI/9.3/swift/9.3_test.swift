import Darwin

let tests: [(string: String, wellFormed: Bool)] = [
    ("", true),
    ("a", true),
    ("()", true),
    ("(()", false),
    ("())", false),
    ("{[]}", true),
    ("{[}]", false),
    ("a{bcd(e[z])f[gh]ij}kl", true),
    ("a{bcd(e[z])f[gh]ij}kl[m", false),
]

for test in tests {
    let actual = wellFormed(test.string)
    guard actual == test.wellFormed else {
        print("For string \(test.string), expected wellFormed to be \(test.wellFormed), " +
            "but was \(actual)")
        exit(1)
    }
}
