import Darwin

let tests: [(words: [String], distance: Int?)] = [
    (
        words: ["abc", "def"],
        distance: nil
    ),
    (
        words: ["abc", "abc"],
        distance: 1
    ),
    (
        words: ["abc", "def", "abc"],
        distance: 2
    ),
    (
        words: ["abc", "def", "ghi", "abc", "jkl", "abc"],
        distance: 2
    ),
]

for test in tests {
    let distance = distanceOfClosestPair(test.words)
    guard distance == test.distance else {
        print("For test words \(test.words), " +
            "expected distance of closest pair to be \(test.distance), but was \(distance)")
        exit(1)
    }
}
