import Darwin

let tests: [(matrix: [[Int]], element: Int, contains: Bool)] = [
    (
        matrix: [],
        element: 0,
        contains: false
    ),
    (
        matrix: [
            [],
        ],
        element: 0,
        contains: false
    ),
    (
        matrix: [
            [],
            [],
        ],
        element: 0,
        contains: false
    ),
    (
        matrix: [
            [0, 3, 6],
        ],
        element: -1,
        contains: false
    ),
    (
        matrix: [
            [0, 3, 6],
        ],
        element: 0,
        contains: true
    ),
    (
        matrix: [
            [0, 3, 6],
        ],
        element: 2,
        contains: false
    ),
    (
        matrix: [
            [0, 3, 6],
        ],
        element: 3,
        contains: true
    ),
    (
        matrix: [
            [0, 3, 6],
        ],
        element: 6,
        contains: true
    ),
    (
        matrix: [
            [0, 3, 6],
        ],
        element: 10,
        contains: false
    ),
    (
        matrix: [
            [0],
            [3],
            [6],
        ],
        element: -1,
        contains: false
    ),
    (
        matrix: [
            [0],
            [3],
            [6],
        ],
        element: 0,
        contains: true
    ),
    (
        matrix: [
            [0],
            [3],
            [6],
        ],
        element: 2,
        contains: false
    ),
    (
        matrix: [
            [0],
            [3],
            [6],
        ],
        element: 3,
        contains: true
    ),
    (
        matrix: [
            [0],
            [3],
            [6],
        ],
        element: 6,
        contains: true
    ),
    (
        matrix: [
            [0],
            [3],
            [6],
        ],
        element: 10,
        contains: false
    ),
    (
        matrix: [
            [0, 1, 5, 7],
            [3, 4, 5, 8],
            [6, 6, 9, 10],
        ],
        element: -1,
        contains: false
    ),
    (
        matrix: [
            [0, 1, 5, 7],
            [3, 4, 5, 8],
            [6, 6, 9, 10],
        ],
        element: 4,
        contains: true
    ),
    (
        matrix: [
            [0, 1, 5, 7],
            [3, 5, 5, 8],
            [4, 5, 9, 9],
        ],
        element: 6,
        contains: false
    ),
    (
        matrix: [
            [0, 1, 5, 7],
            [3, 5, 5, 8],
            [4, 5, 9, 9],
        ],
        element: 10,
        contains: false
    ),
]

for test in tests {
    let actual = contains(matrix: test.matrix, element: test.element)
    guard actual == test.contains else {
        print("For test matrix \(test.matrix) and element \(test.element), " +
            "expected contains to be \(test.contains), but was \(actual)")
        exit(1)
    }
}
