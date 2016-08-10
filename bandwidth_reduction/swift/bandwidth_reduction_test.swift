import Darwin

let tests: [(matrix: [[Int]], permutation: [Int])] = [
    (
        matrix: [],
        permutation: []
    ),
    (
        matrix: [
            [1],
        ],
        permutation: [0]
    ),
    (
        matrix: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ],
        permutation: [0, 1, 2]
    ),
    (
        matrix: [
            [1, 1, 0],
            [1, 1, 1],
            [0, 1, 1],
        ],
        permutation: [0, 1, 2]
    ),
    (
        matrix: [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ],
        permutation: [0, 1, 2]
    ),
    (
        matrix: [
            [1, 0, 1],
            [0, 1, 1],
            [1, 1, 1],
        ],
        permutation: [0, 2, 1]
    ),
    (
        matrix: [
            [1, 1, 1],
            [1, 1, 0],
            [1, 0, 1],
        ],
        permutation: [1, 0, 2]
    ),
    (
        matrix: [
            [1, 0, 1],
            [0, 1, 0],
            [1, 0, 1],
        ],
        permutation: [1, 0, 2]
    ),
    (
        // https://ciprian-zavoianu.blogspot.fr/2009/01/project-bandwidth-reduction.html
        matrix: [
            [1, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 1, 0, 0, 1, 0, 1],
            [0, 1, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [1, 0, 1, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0, 1],
            [0, 0, 0, 1, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 1],
        ],
        permutation: [0, 4, 2, 1, 5, 7, 3, 6]
    ),
]

for test in tests {
    let boolMatrix = test.matrix.map { row in row.map { $0 != 0 } }
    let permutation = reduceBandwidth(boolMatrix)
    guard permutation == test.permutation else {
        print("For test matrix \(test.matrix), expected permutation to be \(test.permutation), " +
            "but was \(permutation)")
        exit(1)
    }
}
