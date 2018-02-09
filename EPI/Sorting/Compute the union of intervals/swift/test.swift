import Darwin

func == (lhs: Interval, rhs: Interval) -> Bool {
    return lhs.start == rhs.start && lhs.end == rhs.end
}

func == (lhs: [Interval], rhs: [Interval]) -> Bool {
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

let tests: [(intervals: [Interval], union: [Interval])] = [
    (
        intervals: [],
        union: []
    ),
    (
        intervals: [
            (start: (value: 1, type: .Open), end: (value: 2, type: .Open)),
        ],
        union: [
            (start: (value: 1, type: .Open), end: (value: 2, type: .Open)),
        ]
    ),
    (
        intervals: [
            (start: (value: 1, type: .Open), end: (value: 2, type: .Open)),
            (start: (value: 2, type: .Open), end: (value: 4, type: .Open)),
        ],
        union: [
            (start: (value: 1, type: .Open), end: (value: 2, type: .Open)),
            (start: (value: 2, type: .Open), end: (value: 4, type: .Open)),
        ]
    ),
    (
        intervals: [
            (start: (value: 1, type: .Open), end: (value: 2, type: .Closed)),
            (start: (value: 2, type: .Open), end: (value: 4, type: .Open)),
        ],
        union: [
            (start: (value: 1, type: .Open), end: (value: 4, type: .Open)),
        ]
    ),
    (
        intervals: [
            (start: (value: 1, type: .Open), end: (value: 2, type: .Open)),
            (start: (value: 2, type: .Closed), end: (value: 4, type: .Open)),
        ],
        union: [
            (start: (value: 1, type: .Open), end: (value: 4, type: .Open)),
        ]
    ),
    (
        intervals: [
            (start: (value: 1, type: .Open), end: (value: 2, type: .Closed)),
            (start: (value: 2, type: .Closed), end: (value: 4, type: .Open)),
        ],
        union: [
            (start: (value: 1, type: .Open), end: (value: 4, type: .Open)),
        ]
    ),
    (
        intervals: [
            (start: (value: 1, type: .Closed), end: (value: 2, type: .Closed)),
            (start: (value: 2, type: .Open), end: (value: 4, type: .Closed)),
        ],
        union: [
            (start: (value: 1, type: .Closed), end: (value: 4, type: .Closed)),
        ]
    ),
    (
        intervals: [
            (start: (value: 1, type: .Open), end: (value: 3, type: .Open)),
            (start: (value: 5, type: .Closed), end: (value: 6, type: .Closed)),
            (start: (value: 2, type: .Open), end: (value: 4, type: .Open)),
        ],
        union: [
            (start: (value: 1, type: .Open), end: (value: 4, type: .Open)),
            (start: (value: 5, type: .Closed), end: (value: 6, type: .Closed)),
        ]
    ),
    (
        intervals: [
            (start: (value: 2, type: .Closed), end: (value: 4, type: .Closed)),
            (start: (value: 8, type: .Closed), end: (value: 11, type: .Open)),
            (start: (value: 13, type: .Open), end: (value: 15, type: .Open)),
            (start: (value: 16, type: .Open), end: (value: 17, type: .Open)),
            (start: (value: 1, type: .Closed), end: (value: 1, type: .Closed)),
            (start: (value: 3, type: .Closed), end: (value: 4, type: .Open)),
            (start: (value: 7, type: .Closed), end: (value: 8, type: .Open)),
            (start: (value: 12, type: .Open), end: (value: 16, type: .Closed)),
            (start: (value: 0, type: .Open), end: (value: 3, type: .Open)),
            (start: (value: 5, type: .Closed), end: (value: 7, type: .Open)),
            (start: (value: 9, type: .Open), end: (value: 11, type: .Closed)),
            (start: (value: 12, type: .Closed), end: (value: 14, type: .Closed)),
        ],
        union: [
            (start: (value: 0, type: .Open), end: (value: 4, type: .Closed)),
            (start: (value: 5, type: .Closed), end: (value: 11, type: .Closed)),
            (start: (value: 12, type: .Closed), end: (value: 17, type: .Open)),
        ]
    ),

]

for test in tests {
    let actual = union(test.intervals)
    guard actual == test.union else {
        print("For test intervals \(test.intervals), expected union to be \(test.union), " +
            "but was \(actual)")
        exit(1)
    }
}
