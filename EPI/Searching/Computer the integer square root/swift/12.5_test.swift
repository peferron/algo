import Darwin

var tests: [(value: Int, root: Int)] = [
    (
        value: 0,
        root: 0
    ),
    (
        value: 1,
        root: 1
    ),
    (
        value: 2,
        root: 1
    ),
    (
        value: 3,
        root: 1
    ),
    (
        value: 4,
        root: 2
    ),
    (
        value: 8,
        root: 2
    ),
    (
        value: 9,
        root: 3
    ),
    (
        value: 120,
        root: 10
    ),
    (
        value: 121,
        root: 11
    ),
    (
        value: Int(Int32.max),
        root: 46340
    )
]

if Int64(Int.max) == Int64.max {
    tests.append((
        value: Int(Int64.max),
        root: 3037000499
    ))
}

for test in tests {
    let actual = root(test.value)
    guard actual == test.root else {
        print("For test value \(test.value), expected root to be \(test.root), but was \(actual)")
        exit(1)
    }
}
