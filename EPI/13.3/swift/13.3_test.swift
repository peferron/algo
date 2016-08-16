import Darwin

let tests: [(letter: String, magazine: String, constructible: Bool)] = [
    (
        letter: "",
        magazine: "",
        constructible: true
    ),
    (
        letter: "",
        magazine: "da bc ee afcd",
        constructible: true
    ),
    (
        letter: "ae b ced",
        magazine: "da bc ee afcd",
        constructible: true
    ),
    (
        letter: "ae b\nced",
        magazine: "da bc ee afcd",
        constructible: true
    ),
    (
        letter: "a e b c e d",
        magazine: "da bc ee afcd",
        constructible: true
    ),
    (
        letter: "ae b ced",
        magazine: "da bc eE afcd",
        constructible: false
    ),
    (
        letter: "ae b ced",
        magazine: "da bc e afcd",
        constructible: false
    ),
]

for test in tests {
    let actual = constructible(test.letter, magazine: test.magazine)
    guard actual == test.constructible else {
        print("For test letter '\(test.letter)' and magazine '\(test.magazine)', " +
            "expected constructible to be \(test.constructible), but was \(actual)")
        exit(1)
    }
}
