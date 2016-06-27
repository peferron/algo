import Darwin

let tests: [(value: Float, tolerance: Float, root: Float)] = [
    (
        value: 0,
        tolerance: 0.1,
        root: 0
    ),
    (
        value: 0.25,
        tolerance: 0.1,
        root: 0.5
    ),
    (
        value: 10,
        tolerance: 0.1,
        root: 3.16
    ),
]

for test in tests {
    let root = squareRoot(test.value, tolerance: test.tolerance)
    guard abs(root - test.root) < test.tolerance else {
        print("For test value \(test.value) and tolerance \(test.tolerance), " +
            "expected square root to be close to \(test.root), but was \(root)")
        exit(1)
    }
}
