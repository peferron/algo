import Darwin

let fns = [powerBruteforce, powerSmartRecursive, powerSmartIterative]

let tests: [(base: Double, exponent: Int, result: Double)] = [
    (base: 0, exponent: 0, result: 1),
    (base: 0, exponent: 1, result: 0),
    (base: 1, exponent: 0, result: 1),
    (base: 1, exponent: 1, result: 1),
    (base: 1, exponent: 2, result: 1),
    (base: 2, exponent: 0, result: 1),
    (base: 2, exponent: 1, result: 2),
    (base: 2, exponent: 2, result: 4),
    (base: 2, exponent: -1, result: 0.5),
    (base: 2, exponent: -2, result: 0.25),
    (base: 12.5, exponent: 6, result: 3814697.265625),
]

for fn in fns {
    for test in tests {
        let actual = fn(test.base, test.exponent)
        guard actual == test.result else {
            print("For base \(test.base) and exponent \(test.exponent), " +
                "expected result to be \(test.result), but was \(actual)")
            exit(1)
        }
    }
}
