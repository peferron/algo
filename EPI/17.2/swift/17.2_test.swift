import Darwin

let tests: [(a: String, b: String, distance: Int)] = [
    (
        // Insertion.
        a: "abc",
        b: "abdc",
        distance: 1
    ),
    (
        // Deletion.
        a: "abc",
        b: "ac",
        distance: 1
    ),
    (
        // Substitution.
        a: "abc",
        b: "adc",
        distance: 1
    ),
    (
        a: "Saturday",
        b: "Sunday",
        distance: 3
    ),
    (
        a: "Saturday",
        b: "Sundays",
        distance: 4
    ),
]

for test in tests {
    let actual = distance(test.a, test.b)
    guard actual == test.distance else {
        print("For strings '\(test.a)' and '\(test.b)', " +
            "expected distance to be \(test.distance), but was \(actual)")
        exit(1)
    }
}
