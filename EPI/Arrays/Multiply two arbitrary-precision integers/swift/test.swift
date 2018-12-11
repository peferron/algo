import Darwin

let tests: [(a: [Int], b: [Int], product: [Int])] = [
    (
        a: [2],
        b: [3],
        product: [6]
    ),
    (
        a: [3],
        b: [5],
        product: [1, 5]
    ),
    (
        a: [-3],
        b: [5],
        product: [-1, 5]
    ),
    (
        a: [-3],
        b: [-5],
        product: [1, 5]
    ),
    (
        a: [0],
        b: [2, 2],
        product: [0]
    ),
    (
        a: [4, 7, 8],
        b: [6, 9],
        product: [3, 2, 9, 8, 2]
    ),
    (
        a: [4, 7, 8],
        b: [1, 7, 6, 9],
        product: [8, 4, 5, 5, 8, 2]
    ),
]

for test in tests {
    for (a, b) in [(test.a, test.b), (test.b, test.a)] {
        let actual = product(a, b)
        guard actual == test.product else {
            print("For numbers \(a) and \(b), expected product to be \(test.product), " +
                "but was \(actual)")
            exit(1)
        }
    }
}
