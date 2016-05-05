import Darwin

struct TriangulateTest {
    let points: [Point]
    let triangulation: [Edge]
}

struct DelaunayTest {
    let triangulation: [Edge]
    let delaunay: [Edge]
}

let triangulateTests = [
    TriangulateTest(
        points: [
            (0, 0),
            (2, 0),
            (1, 1),
        ],
        triangulation: [
            ((0, 0), (2, 0)),
            ((0, 0), (1, 1)),
            ((2, 0), (1, 1)),
        ]
    ),
    TriangulateTest(
        points: [
            (0, 0),
            (2, 0),
            (2, 2),
            (0, 1),
        ],
        triangulation: [
            ((0, 0), (2, 0)),
            ((0, 0), (0, 1)),
            ((2, 0), (2, 2)),
            ((2, 0), (0, 1)),
            ((2, 2), (0, 1)),
        ]
    ),
    TriangulateTest(
        points: [
            (0, 0),
            (2, 0),
            (1, 1),
            (0, 3),
        ],
        triangulation: [
            ((0, 0), (2, 0)),
            ((0, 0), (1, 1)),
            ((0, 0), (0, 3)),
            ((2, 0), (0, 3)),
            ((2, 0), (1, 1)),
            ((1, 1), (0, 3)),
        ]
    ),
    TriangulateTest(
        points: [
            (0, 0),
            (1, 0),
            (1, 1),
            (1, 2),
        ],
        triangulation: [
            ((0, 0), (1, 0)),
            ((0, 0), (1, 1)),
            ((0, 0), (1, 2)),
            ((1, 0), (1, 1)),
            ((1, 1), (1, 2)),
        ]
    ),
    TriangulateTest(
        points: [
            (0, 3),
            (1, 2),
            (1, 5),
            (2, 4),
            (2, 2),
            (3, 2),
            (1, 0),
            (1, 4),
            (2, 3),
        ],
        triangulation: [
            ((0, 3), (1, 0)),
            ((0, 3), (1, 2)),
            ((0, 3), (1, 4)),
            ((0, 3), (1, 5)),
            ((1, 0), (1, 2)),
            ((1, 0), (2, 2)),
            ((1, 0), (3, 2)),
            ((1, 2), (1, 4)),
            ((1, 2), (2, 2)),
            ((1, 4), (1, 5)),
            ((1, 4), (2, 2)),
            ((1, 5), (2, 2)),
            ((1, 5), (2, 3)),
            ((1, 5), (2, 4)),
            ((2, 2), (2, 3)),
            ((2, 2), (3, 2)),
            ((2, 3), (2, 4)),
            ((2, 3), (3, 2)),
            ((2, 4), (3, 2)),
        ]
    ),
    TriangulateTest(
        points: [
            // Additional complication compared to previous test case: the new point (1, 1) is
            // collinear with (1, 0) and (1, 2).
            (0, 3),
            (1, 2),
            (1, 5),
            (2, 4),
            (2, 2),
            (3, 2),
            (1, 0),
            (1, 1),
            (1, 4),
            (2, 3),
        ],
        triangulation: [
            ((0, 3), (1, 0)),
            ((0, 3), (1, 1)),
            ((0, 3), (1, 2)),
            ((0, 3), (1, 4)),
            ((0, 3), (1, 5)),
            ((1, 0), (1, 1)),
            ((1, 0), (2, 2)),
            ((1, 0), (3, 2)),
            ((1, 1), (1, 2)),
            ((1, 1), (2, 2)),
            ((1, 2), (1, 4)),
            ((1, 2), (2, 2)),
            ((1, 4), (1, 5)),
            ((1, 4), (2, 2)),
            ((1, 5), (2, 2)),
            ((1, 5), (2, 3)),
            ((1, 5), (2, 4)),
            ((2, 2), (2, 3)),
            ((2, 2), (3, 2)),
            ((2, 3), (2, 4)),
            ((2, 3), (3, 2)),
            ((2, 4), (3, 2)),
        ]
    ),
    TriangulateTest(
        points: [
            // Additional complication compared to previous test case: the new point (1, 3) is
            // collinear with the start point (0, 3) and (2, 3).
            (0, 3),
            (1, 2),
            (1, 5),
            (2, 4),
            (2, 2),
            (3, 2),
            (1, 0),
            (1, 3),
            (1, 1),
            (1, 4),
            (2, 3),
        ],
        triangulation: [
            ((0, 3), (1, 0)),
            ((0, 3), (1, 1)),
            ((0, 3), (1, 2)),
            ((0, 3), (1, 3)),
            ((0, 3), (1, 4)),
            ((0, 3), (1, 5)),
            ((1, 0), (1, 1)),
            ((1, 0), (2, 2)),
            ((1, 0), (3, 2)),
            ((1, 1), (1, 2)),
            ((1, 1), (2, 2)),
            ((1, 2), (1, 3)),
            ((1, 2), (2, 2)),
            ((1, 3), (1, 4)),
            ((1, 3), (2, 2)),
            ((1, 4), (1, 5)),
            ((1, 4), (2, 2)),
            ((1, 5), (2, 2)),
            ((1, 5), (2, 3)),
            ((1, 5), (2, 4)),
            ((2, 2), (2, 3)),
            ((2, 2), (3, 2)),
            ((2, 3), (2, 4)),
            ((2, 3), (3, 2)),
            ((2, 4), (3, 2)),
        ]
    ),
]

let delaunayTests = [
    DelaunayTest(
        triangulation: [
            ((0, 1), (2, 0)),
            ((2, 0), (3, 1)),
            ((3, 1), (2, 2)),
            ((2, 2), (0, 1)),
            ((0, 1), (3, 1)),
        ],
        delaunay: [
            ((0, 1), (2, 0)),
            ((2, 0), (3, 1)),
            ((3, 1), (2, 2)),
            ((2, 2), (0, 1)),
            ((2, 0), (2, 2)), // The horizontal edge is replaced with a vertical edge
        ]
    ),
    DelaunayTest(
        triangulation: [
            ((0, 2), (2, 0)),
            ((2, 0), (3, 2)),
            ((3, 2), (2, 4)),
            ((2, 4), (0, 2)),
            ((2, 0), (2, 4)),
        ],
        delaunay: [
            ((0, 2), (2, 0)),
            ((2, 0), (3, 2)),
            ((3, 2), (2, 4)),
            ((2, 4), (0, 2)),
            ((0, 2), (3, 2)), // The vertical edge is replaced with a horizontal edge
        ]
    ),
    DelaunayTest(
        triangulation: [
            ((0, 3), (1, 0)),
            ((0, 3), (1, 2)),
            ((0, 3), (1, 4)),
            ((0, 3), (1, 5)),
            ((1, 0), (1, 2)),
            ((1, 0), (2, 2)),
            ((1, 0), (3, 2)),
            ((1, 2), (1, 4)),
            ((1, 2), (2, 2)),
            ((1, 4), (1, 5)),
            ((1, 4), (2, 2)),
            ((1, 5), (2, 2)),
            ((1, 5), (2, 3)),
            ((1, 5), (2, 4)),
            ((2, 2), (2, 3)),
            ((2, 2), (3, 2)),
            ((2, 3), (2, 4)),
            ((2, 3), (3, 2)),
            ((2, 4), (3, 2)),
        ],
        delaunay: [
            ((0, 3), (1, 0)),
            ((0, 3), (1, 2)),
            ((0, 3), (1, 4)),
            ((0, 3), (1, 5)),
            ((1, 0), (1, 2)),
            ((1, 0), (2, 2)),
            ((1, 0), (3, 2)),
            ((1, 2), (1, 4)),
            ((1, 2), (2, 2)),
            ((1, 2), (2, 3)),
            ((1, 4), (1, 5)),
            ((1, 4), (2, 3)),
            ((1, 4), (2, 4)),
            ((1, 5), (2, 4)),
            ((2, 2), (2, 3)),
            ((2, 2), (3, 2)),
            ((2, 3), (2, 4)),
            ((2, 3), (3, 2)),
            ((2, 4), (3, 2)),
        ]
    ),
]

for test in triangulateTests {
    let actual = triangulate(test.points).sort(<)
    let expected = test.triangulation.sort(<)
    guard actual == expected else {
        print("For test points \(test.points)\n" +
            "expected triangulation to be \(expected)\n" +
            "but was \(actual)")
        exit(1)
    }
}

for test in delaunayTests {
    let actual = delaunay(test.triangulation).sort(<)
    let expected = test.delaunay.sort(<)
    guard actual == expected else {
        print("For test triangulation \(test.triangulation)\n" +
            "expected triangulation to be \(expected)\n" +
            "but was \(actual)")
        exit(1)
    }
}
