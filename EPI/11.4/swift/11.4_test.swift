import Darwin

func == (lhs: [Coordinates], rhs: [Coordinates]) -> Bool {
    guard lhs.count == rhs.count else {
        return false
    }
    for (index, element) in lhs.enumerate() {
        guard rhs[index] == element else {
            return false
        }
    }
    return true
}

let tests: [(stars: [Coordinates], k: Int, closest: [Coordinates])] = [
    (
        stars: [],
        k: 10,
        closest: []
    ),
    (
        stars: [
            (3, 0, 0),
            (2, 0, 0),
        ],
        k: 10,
        closest: [
            (3, 0, 0),
            (2, 0, 0),
        ]
    ),
    (
        stars: [
            (3, 0, 0),
            (0, 7, 0),
            (2, 0, 0),
            (5, 2, 0),
            (0, 4, 0),
            (0, 1, 1),
            (1, 2, 3),
        ],
        k: 1,
        closest: [
            (0, 1, 1),
        ]
    ),
    (
        stars: [
            (3, 0, 0),
            (0, 7, 0),
            (2, 0, 0),
            (5, 2, 0),
            (0, 4, 0),
            (0, 1, 1),
            (1, 2, 3),
        ],
        k: 4,
        closest: [
            (1, 2, 3),
            (3, 0, 0),
            (2, 0, 0),
            (0, 1, 1),
        ]
    ),
]

for test in tests {
    let actual = closest(test.stars, count: test.k)
    guard actual == test.closest else {
        print("For test stars \(test.stars) and k \(test.k), " +
            "expected k closest stars to be \(test.closest), but were \(actual)")
        exit(1)
    }
}
