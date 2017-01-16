import Darwin

let tests: [(rows: Int, cols: Int, traversalsCount: Int)] = [
    (
        rows: 1,
        cols: 1,
        traversalsCount: 1
    ),
    (
        rows: 1,
        cols: 2,
        traversalsCount: 1
    ),
    (
        rows: 2,
        cols: 2,
        traversalsCount: 2
    ),
    (
        rows: 2,
        cols: 3,
        traversalsCount: 3
    ),
    (
        rows: 3,
        cols: 3,
        traversalsCount: 6
    ),
    (
        rows: 5,
        cols: 5,
        traversalsCount: 70
    ),
]

let reversedTests = tests.map { test in
    (
        rows: test.cols,
        cols: test.rows,
        traversalsCount: test.traversalsCount
    )
}

for (fnIndex, fn) in [traversalsCountDynamicProgramming, traversalsCountMath].enumerated() {
    for test in tests + reversedTests {
        let actual = fn(test.rows, test.cols)
        guard actual == test.traversalsCount else {
            print("For \(test.rows) rows and \(test.cols) cols, using function #\(fnIndex), " +
                "expected traversals count to be \(test.traversalsCount), but was \(actual)")
            exit(1)
        }
    }
}
