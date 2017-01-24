import Darwin

let tests: [(strings: [String], majorityElement: String)] = [
    (
        strings: ["b"],
        majorityElement: "b"
    ),
    (
        strings: ["b", "b"],
        majorityElement: "b"
    ),
    (
        strings: ["b", "a", "b"],
        majorityElement: "b"
    ),
    (
        strings: ["b", "a", "b", "a", "a"],
        majorityElement: "a"
    ),
    (
        strings: ["b", "a", "c", "a", "a", "b", "a", "a", "c", "a"],
        majorityElement: "a"
    )
]

for fn in [majorityElement, majorityElementRandom] {
    for test in tests {
        let actual = fn(test.strings)
        guard actual == test.majorityElement else {
            print("For strings \(test.strings), " +
                "expected majority element to be \(test.majorityElement), but was \(actual)")
            exit(1)
        }
    }
}
