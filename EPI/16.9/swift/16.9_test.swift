import Darwin

func == <T: Equatable>(lhs: [[T]], rhs: [[T]]) -> Bool {
    guard lhs.count == rhs.count else {
        return false
    }
    for (i, array) in lhs.enumerated() {
        guard array == rhs[i] else {
            return false
        }
    }
    return true
}

let tests: [(problem: [[Int?]], solution: [[Int]])] = [
    (
        problem: [
            [nil, nil, nil,     nil, nil, nil,     nil, nil, nil],
            [nil, nil, nil,     nil, nil, nil,     nil, nil, nil],
            [nil, nil, nil,     nil, nil, nil,     nil, nil, nil],


            [nil, nil, nil,     nil, nil, nil,     nil, nil, nil],
            [nil, nil, nil,     nil, nil, nil,     nil, nil, nil],
            [nil, nil, nil,     nil, nil, nil,     nil, nil, nil],


            [nil, nil, nil,     nil, nil, nil,     nil, nil, nil],
            [nil, nil, nil,     nil, nil, nil,     nil, nil, nil],
            [nil, nil, nil,     nil, nil, nil,     nil, nil, nil],
        ],
        solution: [
            [  1,   2,   3,       4,   5,   6,       7,   8,   9],
            [  4,   5,   6,       7,   8,   9,       1,   2,   3],
            [  7,   8,   9,       1,   2,   3,       4,   5,   6],


            [  2,   1,   4,       3,   6,   5,       8,   9,   7],
            [  3,   6,   5,       8,   9,   7,       2,   1,   4],
            [  8,   9,   7,       2,   1,   4,       3,   6,   5],


            [  5,   3,   1,       6,   4,   2,       9,   7,   8],
            [  6,   4,   2,       9,   7,   8,       5,   3,   1],
            [  9,   7,   8,       5,   3,   1,       6,   4,   2]
        ]
    ),
    (
        problem: [
            [  5,   3, nil,     nil,   7, nil,     nil, nil, nil],
            [  6, nil, nil,       1,   9,   5,     nil, nil, nil],
            [nil,   9,   8,     nil, nil, nil,     nil,   6, nil],


            [  8, nil, nil,     nil,   6, nil,     nil, nil,   3],
            [  4, nil, nil,       8, nil,   3,     nil, nil,   1],
            [  7, nil, nil,     nil,   2, nil,     nil, nil,   6],


            [nil,   6, nil,     nil, nil, nil,       2,   8, nil],
            [nil, nil, nil,       4,   1,   9,     nil, nil,   5],
            [nil, nil, nil,     nil,   8, nil,     nil,   7,   9],
        ],
        solution: [
            [  5,   3,   4,       6,   7,   8,       9,   1,   2],
            [  6,   7,   2,       1,   9,   5,       3,   4,   8],
            [  1,   9,   8,       3,   4,   2,       5,   6,   7],


            [  8,   5,   9,       7,   6,   1,       4,   2,   3],
            [  4,   2,   6,       8,   5,   3,       7,   9,   1],
            [  7,   1,   3,       9,   2,   4,       8,   5,   6],


            [  9,   6,   1,       5,   3,   7,       2,   8,   4],
            [  2,   8,   7,       4,   1,   9,       6,   3,   5],
            [  3,   4,   5,       2,   8,   6,       1,   7,   9],
        ]
    ),

]

for test in tests {
    let actual = solve(test.problem)
    guard actual == test.solution else {
        print("For test problem \(test.problem), expected solution to be \(test.solution), " +
            "but was \(actual)")
        exit(1)
    }
}
