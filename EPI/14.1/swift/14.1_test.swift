import Darwin

let tests: [(a: [Int], b: [Int], intersection: [Int])] = [
    (
        a: [],
        b: [],
        intersection: []
    ),
    (
        a: [3, 5],
        b: [],
        intersection: []
    ),
    (
        a: [],
        b: [3, 5],
        intersection: []
    ),
    (
        a: [1, 3, 4, 6, 7, 9, 9, 9, 11, 11, 12, 15],
        b: [2, 3, 5, 11],
        intersection: [3, 11]
    ),
    (
        a: [2, 3, 3, 5, 5, 6, 7, 7, 8, 12],
        b: [5, 5, 6, 8, 8, 9, 10, 10],
        intersection: [5, 6, 8]
    ),
]

for test in tests {
    let actual = intersection(test.a, test.b)
    guard actual == test.intersection else {
        print("For test arrays \(test.a) and \(test.b), " +
            "expected intersection to be \(test.intersection), but was \(actual)")
        exit(1)
    }
}
