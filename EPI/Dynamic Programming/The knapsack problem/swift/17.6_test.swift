import Darwin

func == (lhs: [Item], rhs: [Item]) -> Bool {
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

let tests: [(items: [Item], subTests: [(capacity: Int, selection: [Int])])] = [
    (
        items: [
            (value: 13, weight: 5),
            (value: 15, weight: 4),
            (value: 10, weight: 3),
            (value: 6, weight: 2),
        ],
        subTests: [
            (capacity: 1, selection: []),
            (capacity: 2, selection: [3]),
            (capacity: 3, selection: [2]),
            (capacity: 4, selection: [1]),
            (capacity: 5, selection: [2, 3]),
            (capacity: 6, selection: [1, 3]),
            (capacity: 7, selection: [1, 2]),
            (capacity: 8, selection: [1, 2]),
            (capacity: 9, selection: [1, 2, 3]),
            (capacity: 10, selection: [1, 2, 3]),
            (capacity: 11, selection: [0, 1, 3]),
            (capacity: 12, selection: [0, 1, 2]),
            (capacity: 13, selection: [0, 1, 2]),
            (capacity: 14, selection: [0, 1, 2, 3]),
        ]
    ),
    (
        items: [
            (value: 65, weight: 20),
            (value: 35, weight: 8),
            (value: 245, weight: 60),
            (value: 195, weight: 55),
            (value: 65, weight: 40),
            (value: 150, weight: 70),
            (value: 275, weight: 85),
            (value: 155, weight: 25),
            (value: 120, weight: 30),
            (value: 320, weight: 65),
            (value: 75, weight: 75),
            (value: 40, weight: 10),
            (value: 200, weight: 95),
            (value: 100, weight: 50),
            (value: 220, weight: 40),
            (value: 99, weight: 10),
        ],
        subTests: [
            (capacity: 130, selection: [7, 9, 14]),
        ]
    )
]

for test in tests {
    for subTest in test.subTests {
        let actual = select(test.items, capacity: subTest.capacity)
        guard actual == subTest.selection else {
            print("For items \(test.items) and capacity \(subTest.capacity), " +
                "expected selection to be \(subTest.selection), but was \(actual)")
            exit(1)
        }
    }
}
