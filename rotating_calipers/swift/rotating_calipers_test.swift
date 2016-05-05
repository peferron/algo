import Darwin

extension Point: Equatable {}

public func == (lhs: Point, rhs: Point) -> Bool {
    return lhs.x == rhs.x && lhs.y == rhs.y
}

func == <T: Equatable, U: Equatable>(lhs: [(T, U)], rhs: [(T, U)]) -> Bool {
    guard lhs.count == rhs.count else {
        return false
    }

    for (index, value) in lhs.enumerate() {
        guard value == rhs[index] else {
            return false
        }
    }

    return true
}

struct Test {
    let polygon: [Point]
    let antipodalPairs: [Pair]
    let diameter: Pair
}

let tests = [
    Test(
        polygon: [
            Point(x: 0, y: 0),
            Point(x: 2, y: 0),
            Point(x: 1, y: 1),
        ],
        antipodalPairs: [
            (Point(x: 0, y: 0), Point(x: 2, y: 0)),
            (Point(x: 0, y: 0), Point(x: 1, y: 1)),
            (Point(x: 2, y: 0), Point(x: 1, y: 1)),
        ],
        diameter: (Point(x: 0, y: 0), Point(x: 2, y: 0))
    ),
    Test(
        polygon: [
            Point(x: 0, y: 0),
            Point(x: 2, y: 0),
            Point(x: 3, y: 2),
            Point(x: 0, y: 1),
        ],
        antipodalPairs: [
            (Point(x: 0, y: 0), Point(x: 3, y: 2)),
            (Point(x: 2, y: 0), Point(x: 3, y: 2)),
            (Point(x: 2, y: 0), Point(x: 0, y: 1)),
            (Point(x: 3, y: 2), Point(x: 0, y: 1)),
        ],
        diameter: (Point(x: 0, y: 0), Point(x: 3, y: 2))
    ),
    Test(
        polygon: [
            Point(x: 0, y: 0),
            Point(x: 3, y: 0),
            Point(x: 3, y: 2),
            Point(x: 0, y: 1),
        ],
        antipodalPairs: [
            (Point(x: 0, y: 0), Point(x: 3, y: 0)),
            (Point(x: 0, y: 0), Point(x: 3, y: 2)),
            (Point(x: 3, y: 0), Point(x: 3, y: 2)),
            (Point(x: 3, y: 0), Point(x: 0, y: 1)),
            (Point(x: 3, y: 2), Point(x: 0, y: 1)),
        ],
        diameter: (Point(x: 0, y: 0), Point(x: 3, y: 2))
    ),
    Test(
        polygon: [
            Point(x: 8, y: 0),
            Point(x: 13, y: 3),
            Point(x: 6, y: 6),
            Point(x: 1, y: 5),
            Point(x: 0, y: 4),
            Point(x: 0, y: 3),
            Point(x: 1, y: 1),
        ],
        antipodalPairs: [
            (Point(x: 8, y: 0), Point(x: 6, y: 6)),
            (Point(x: 8, y: 0), Point(x: 1, y: 5)),
            (Point(x: 13, y: 3), Point(x: 1, y: 5)),
            (Point(x: 13, y: 3), Point(x: 0, y: 4)),
            (Point(x: 13, y: 3), Point(x: 0, y: 3)),
            (Point(x: 13, y: 3), Point(x: 1, y: 1)),
            (Point(x: 6, y: 6), Point(x: 1, y: 1)),
        ],
        diameter: (Point(x: 0, y: 4), Point(x: 13, y: 3))
    )
]

func sort(pair: Pair) -> Pair {
    return (min(pair.0, pair.1), max(pair.0, pair.1))
}

func sort(pairs: [Pair]) -> [Pair] {
    // First, sort the points inside each pair. Then sort the pairs.
    return pairs.map(sort).sort(<)
}

for test in tests {
    let actualPairs = sort(antipodalPairs(test.polygon))
    let expectedPairs = sort(test.antipodalPairs)
    guard actualPairs == expectedPairs else {
        print("For test polygon \(test.polygon)\nexpected antipodal pairs to be " +
            "\(expectedPairs)\nbut were \(actualPairs)")
        exit(1)
    }

    let actualDiameter = sort(diameter(test.polygon))
    let expectedDiameter = sort(test.diameter)
    guard actualDiameter == expectedDiameter else {
        print("For test polygon \(test.polygon)\nexpected diameter to be \(expectedDiameter)\n" +
            "but was \(actualDiameter)")
        exit(1)
    }
}
