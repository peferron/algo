import Darwin

struct TriangulateTest {
    let points: [Point]
    let triangulation: [Edge]
}

struct DelaunizeTest {
    let triangulation: [Edge]
    let delaunayTriangulation: [Edge]
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

let delaunizeTests = [
    DelaunizeTest(
        triangulation: [
            ((0, 0), (2, 0)),
            ((0, 0), (1, 1)),
            ((2, 0), (1, 1)),
        ],
        delaunayTriangulation: [
            ((0, 0), (2, 0)),
            ((0, 0), (1, 1)),
            ((2, 0), (1, 1)),
        ]
    ),
]

for test in triangulateTests {
    let actual = triangulate(test.points).sort(<)
    let expected = test.triangulation.sort(<)
    guard actual == expected else {
        print("For test points \(test.points)\nexpected triangulation to be \(expected)\n" +
            "but was \(actual)")
        exit(1)
    }
}

// for test in delaunizeTests {
//     let actual = sort(delaunize(test.triangulation))
//     let expected = sort(test.delaunayTriangulation)
//     guard actual == expected else {
//         print("For test triangulation \(test.triangulation)\nexpected triangulation to be " +
//             "\(expected)\nbut was \(actual)")
//         exit(1)
//     }
// }
