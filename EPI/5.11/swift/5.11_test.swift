// swiftlint:disable variable_name

import Darwin

func == (lhs: Rect, rhs: Rect) -> Bool {
    return lhs.origin == rhs.origin && lhs.size == rhs.size
}

let tests: [(a: Rect, b: Rect, intersection: Rect?)] = [
    (
        Rect(origin: (0, 0), size: (5, 5)),
        Rect(origin: (1, 1), size: (2, 3)),
        Rect(origin: (1, 1), size: (2, 3))
    ),
    (
        Rect(origin: (0, 0), size: (5, 5)),
        Rect(origin: (-5, -5), size: (7, 8)),
        Rect(origin: (0, 0), size: (2, 3))
    ),
    (
        Rect(origin: (0, 0), size: (5, 5)),
        Rect(origin: (5, 4), size: (1, 7)),
        Rect(origin: (5, 4), size: (0, 1))
    ),
    (
        Rect(origin: (0, 0), size: (5, 5)),
        Rect(origin: (0, 6), size: (5, 5)),
        nil
    ),
]

for test in tests {
    for (a, b) in [(test.a, test.b), (test.b, test.a)] {
        let actual = intersection(a, b)
        guard actual == nil ? test.intersection == nil : actual! == test.intersection! else {
            print("For rectangles \(a) and \(b), " +
                "expected intersection to be \(test.intersection), but was \(actual)")
            exit(1)
        }
    }
}
