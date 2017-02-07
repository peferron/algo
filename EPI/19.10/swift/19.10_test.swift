import Darwin

typealias SubTest = (start: Int, end: Int, shortestPath: [Int]?)

let tests: [(graph: Graph, subTests: [SubTest])] = [
    (
        graph: (
            vertexCount: 1,
            directed: false,
            edges: []
        ),
        subTests: [
            (start: 0, end: 0, shortestPath: [0]),
        ]
    ),
    (
        graph: (
            vertexCount: 2,
            directed: false,
            edges: []
        ),
        subTests: [
            (start: 0, end: 1, shortestPath: nil),
        ]
    ),
    (
        graph: (
            vertexCount: 2,
            directed: false,
            edges: [
                (x: 0, y: 1, length: 7),
            ]
        ),
        subTests: [
            (start: 0, end: 1, shortestPath: [0, 1]),
        ]
    ),
    (
        graph: (
            vertexCount: 2,
            directed: true,
            edges: [
                (x: 0, y: 1, length: 7),
            ]
        ),
        subTests: [
            (start: 0, end: 1, shortestPath: [0, 1]),
            (start: 1, end: 0, shortestPath: nil),
        ]
    ),
    (
        graph: (
            vertexCount: 3,
            directed: true,
            edges: [
                (x: 0, y: 2, length: 5),
                (x: 0, y: 1, length: 2),
                (x: 1, y: 2, length: 3),
            ]
        ),
        subTests: [
            (start: 0, end: 2, shortestPath: [0, 2]),
        ]
    ),
    (
        graph: (
            vertexCount: 4,
            directed: true,
            edges: [
                (x: 0, y: 3, length: 11),
                (x: 0, y: 1, length: 5),
                (x: 1, y: 2, length: 3),
                (x: 2, y: 3, length: 2),
                (x: 1, y: 3, length: 5),
            ]
        ),
        subTests: [
            (start: 1, end: 3, shortestPath: [1, 3]),
            (start: 0, end: 3, shortestPath: [0, 1, 3]),
        ]
    ),
    (
        graph: (
            vertexCount: 6,
            directed: false,
            edges: [
                (x: 0, y: 1, length: 7),
                (x: 0, y: 2, length: 9),
                (x: 0, y: 5, length: 14),
                (x: 1, y: 2, length: 10),
                (x: 1, y: 3, length: 15),
                (x: 2, y: 3, length: 11),
                (x: 2, y: 5, length: 2),
                (x: 3, y: 4, length: 6),
                (x: 4, y: 5, length: 9),
            ]
        ),
        subTests: [
            // See an animated illustration of this example at:
            // http://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
            (start: 0, end: 4, shortestPath: [0, 2, 5, 4]),
            (start: 1, end: 4, shortestPath: [1, 3, 4]),
        ]
    ),
]

private func reversed(_ subTest: SubTest) -> SubTest {
    return (start: subTest.end, end: subTest.start, shortestPath: subTest.shortestPath?.reversed())
}

for test in tests {
    let subTests = test.graph.directed ? test.subTests : test.subTests + test.subTests.map(reversed)

    for subTest in subTests {
        let actual = shortestPath(from: subTest.start, to: subTest.end, in: test.graph)

        guard actual == nil && subTest.shortestPath == nil ||
            actual != nil && subTest.shortestPath != nil && actual! == subTest.shortestPath! else {
            print("For graph \(test.graph), expected shortestPath from \(subTest.start) " +
                "to \(subTest.end) to be \(subTest.shortestPath), but was \(actual)")
            exit(1)
        }
    }
}
