import Darwin

struct Test {
    let polygon: [Point]
    let antipodalPairs: [Pair]
    let diameter: Pair
}

let tests = [
    Test(
        polygon: [
            (0, 0),
            (2, 0),
            (1, 1),
        ],
        antipodalPairs: [
            ((0, 0), (2, 0)),
            ((0, 0), (1, 1)),
            ((2, 0), (1, 1)),
        ],
        diameter: ((0, 0), (2, 0))
    ),
    Test(
        polygon: [
            (0, 0),
            (2, 0),
            (3, 2),
            (0, 1),
        ],
        antipodalPairs: [
            ((0, 0), (3, 2)),
            ((2, 0), (3, 2)),
            ((2, 0), (0, 1)),
            ((3, 2), (0, 1)),
        ],
        diameter: ((0, 0), (3, 2))
    ),
    Test(
        polygon: [
            (0, 0),
            (3, 0),
            (3, 2),
            (0, 1),
        ],
        antipodalPairs: [
            ((0, 0), (3, 0)),
            ((0, 0), (3, 2)),
            ((3, 0), (3, 2)),
            ((3, 0), (0, 1)),
            ((3, 2), (0, 1)),
        ],
        diameter: ((0, 0), (3, 2))
    ),
    Test(
        polygon: [
            (8, 0),
            (13, 3),
            (6, 6),
            (1, 5),
            (0, 4),
            (0, 3),
            (1, 1),
        ],
        antipodalPairs: [
            ((8, 0), (6, 6)),
            ((8, 0), (1, 5)),
            ((13, 3), (1, 5)),
            ((13, 3), (0, 4)),
            ((13, 3), (0, 3)),
            ((13, 3), (1, 1)),
            ((6, 6), (1, 1)),
        ],
        diameter: ((0, 4), (13, 3))
    )
]


for test in tests {
    let actualPairs = antipodalPairs(test.polygon).sort(<)
    let expectedPairs = test.antipodalPairs.sort(<)
    guard actualPairs == expectedPairs else {
        print("For test polygon \(test.polygon)\nexpected antipodal pairs to be " +
            "\(expectedPairs)\nbut were \(actualPairs)")
        exit(1)
    }

    let actualDiameter = diameter(test.polygon)
    guard actualDiameter == test.diameter else {
        print("For test polygon \(test.polygon)\nexpected diameter to be \(test.diameter)\n" +
            "but was \(actualDiameter)")
        exit(1)
    }
}
