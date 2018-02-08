import Darwin

func == (lhs: [Combination], rhs: [Combination]) -> Bool {
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

let tests: [(score: Int, combinations: [Combination])] = [
    (
        score: 0,
        combinations: [
            (safeties: 0, goals: 0, touchdowns: 0),
        ]
    ),
    (
        score: 1,
        combinations: []
    ),
    (
        score: 2,
        combinations: [
            (safeties: 1, goals: 0, touchdowns: 0),
        ]
    ),
    (
        score: 3,
        combinations: [
            (safeties: 0, goals: 1, touchdowns: 0),
        ]
    ),
    (
        score: 4,
        combinations: [
            (safeties: 2, goals: 0, touchdowns: 0),
        ]
    ),
    (
        score: 5,
        combinations: [
            (safeties: 1, goals: 1, touchdowns: 0),
        ]
    ),
    (
        score: 6,
        combinations: [
            (safeties: 3, goals: 0, touchdowns: 0),
            (safeties: 0, goals: 2, touchdowns: 0),
        ]
    ),
    (
        score: 7,
        combinations: [
            (safeties: 2, goals: 1, touchdowns: 0),
            (safeties: 0, goals: 0, touchdowns: 1),
        ]
    ),
    (
        score: 12,
        combinations: [
            (safeties: 6, goals: 0, touchdowns: 0),
            (safeties: 3, goals: 2, touchdowns: 0),
            (safeties: 1, goals: 1, touchdowns: 1),
            (safeties: 0, goals: 4, touchdowns: 0),
        ]
    ),
    (
        score: 13,
        combinations: [
            (safeties: 5, goals: 1, touchdowns: 0),
            (safeties: 3, goals: 0, touchdowns: 1),
            (safeties: 2, goals: 3, touchdowns: 0),
            (safeties: 0, goals: 2, touchdowns: 1),
        ]
    ),
]

for test in tests {
    let actualCombinations = combinations(score: test.score)
    guard actualCombinations == test.combinations else {
        print("For score \(test.score), expected combinations to be \(test.combinations), " +
            "but were \(actualCombinations)")
        exit(1)
    }

    let actualCombinationsCount = combinationsCount(score: test.score)
    guard actualCombinationsCount == test.combinations.count else {
        print("For score \(test.score), " +
            "expected combinations count to be \(test.combinations.count), " +
            "but was \(actualCombinationsCount)")
        exit(1)
    }
}
