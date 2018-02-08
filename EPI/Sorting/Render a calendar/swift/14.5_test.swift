import Darwin

let tests: [(events: [Event], maxConcurrentEvents: Int)] = [
    (
        events: [],
        maxConcurrentEvents: 0
    ),
    (
        events: [(0, 1), (1, 2)],
        maxConcurrentEvents: 2
    ),
    (
        events: [(0, 1), (2, 3)],
        maxConcurrentEvents: 1
    ),
    (
        events: [(0, 2), (4, 5), (1, 3)],
        maxConcurrentEvents: 2
    ),
    (
        events: [(0, 2), (1, 4), (2, 3)],
        maxConcurrentEvents: 3
    ),
    (
        events: [
            (1, 5), (6, 10), (11, 13), (14, 15),
            (2, 7), (8, 9), (12, 15),
            (4, 5), (9, 17)
        ],
        maxConcurrentEvents: 3
    ),
]

for test in tests {
    let actual = maxConcurrentEvents(test.events)
    guard actual == test.maxConcurrentEvents else {
        print("For test events \(test.events), " +
            "expected max concurrent events to be \(test.maxConcurrentEvents), but was \(actual)")
        exit(1)
    }
}
