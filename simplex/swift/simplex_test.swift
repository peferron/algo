// swiftlint:disable comma
// swiftlint:disable variable_name

import Darwin

let tests: [(tableau: [[Float]], solution: [Float])] = [
    (
        // http://jadagul.tumblr.com/post/145201618713/linear-programming-how-does-it-work
        // First inequality only.
        tableau: [
            [1, -5, -3, 0,   0],
            [0,  1,  1, 1, 100],
        ],
        solution: [500, 100, 0, 0]
    ),
    (
        // http://jadagul.tumblr.com/post/145201618713/linear-programming-how-does-it-work
        // First and second inequalities only.
        tableau: [
            [1, -5, -3, 0, 0,   0],
            [0,  1,  1, 1, 0, 100],
            [0,  4,  2, 0, 1, 300],
        ],
        solution: [400, 50, 50, 0, 0]
    ),
    (
        // http://jadagul.tumblr.com/post/145201618713/linear-programming-how-does-it-work
        // All inequalities.
        tableau: [
            [1, -5, -3, 0, 0, 0,    0],
            [0,  1,  1, 1, 0, 0,  100],
            [0,  4,  2, 0, 1, 0,  300],
            [0, 40, 30, 0, 0, 1, 3300],
        ],
        solution: [390, 60, 30, 10, 0, 0]
    ),
    (
        // Example at http://www.zweigmedia.com/RealWorld/simplex.html
        // Using <= instead of >=.
        tableau: [
            [1, -0.5, -3, -1, -4, 0, 0, 0,  0],
            [0,    1,  1,  1,  1, 1, 0, 0, 40],
            [0,    2,  1, -1, -1, 0, 1, 0, 10],
            [0,    0, -1,  0,  1, 0, 0, 1, 10],
        ],
        solution: [145, 0, 15, 0, 25, 0, 20, 0]
    ),
    (
        // Example at http://www.zweigmedia.com/RealWorld/simplex.html
        tableau: [
            [1, -0.5, -3, -1, -4, 0, 0, 0,   0],
            [0,    1,  1,  1,  1, 1, 0, 0,  40],
            [0,   -2, -1,  1,  1, 0, 1, 0, -10],
            [0,    0,  1,  0, -1, 0, 0, 1, -10],
        ],
        solution: [115, 10, 10, 0, 20, 0, 0, 0]
    ),
]

func equalApprox(a: Float, _ b: Float) -> Bool {
    return abs(a - b) < 0.001
}

func equalApprox(a: [Float], _ b: [Float]) -> Bool {
    return a.count == b.count &&
        !a.enumerate().contains { index, value in !equalApprox(value, b[index]) }
}

for test in tests {
    let solution = maximize(test.tableau)
    guard equalApprox(solution, test.solution) else {
        print("For test tableau \(test.tableau), expected solution to be \(test.solution), " +
            "but was \(solution)")
        exit(1)
    }
}
