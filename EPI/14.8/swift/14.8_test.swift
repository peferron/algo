import Darwin

func == (lhs: [Student], rhs: [Student]) -> Bool {
    guard lhs.count == rhs.count else {
        return false
    }
    for (i, v) in lhs.enumerated() {
        guard v == rhs[i] else {
            return false
        }
    }
    return true
}

let tests: [(students: [Student], grouped: [Student])] = [
    (
        students: [],
        grouped: []
    ),
    (
        students: [
            Student(name: "17 #1", age: 17),
            Student(name: "18 #1", age: 18),
        ],
        grouped: [
            Student(name: "17 #1", age: 17),
            Student(name: "18 #1", age: 18),
        ]
    ),
    (
        students: [
            Student(name: "18 #1", age: 18),
            Student(name: "17 #1", age: 17),
        ],
        grouped: [
            Student(name: "17 #1", age: 17),
            Student(name: "18 #1", age: 18),
        ]
    ),
    (
        students: [
            Student(name: "17 #1", age: 17),
            Student(name: "18 #1", age: 18),
            Student(name: "17 #2", age: 17),
        ],
        grouped: [
            Student(name: "17 #1", age: 17),
            Student(name: "17 #2", age: 17),
            Student(name: "18 #1", age: 18),
        ]
    ),
    (
        students: [
            Student(name: "17 #1", age: 17),
            Student(name: "18 #1", age: 18),
            Student(name: "21 #1", age: 21),
            Student(name: "21 #2", age: 21),
            Student(name: "18 #2", age: 18),
            Student(name: "17 #2", age: 17),
            Student(name: "21 #3", age: 21),
            Student(name: "19 #1", age: 19),
        ],
        grouped: [
            Student(name: "17 #1", age: 17),
            Student(name: "17 #2", age: 17),
            Student(name: "18 #1", age: 18),
            Student(name: "18 #2", age: 18),
            Student(name: "19 #1", age: 19),
            Student(name: "21 #1", age: 21),
            Student(name: "21 #2", age: 21),
            Student(name: "21 #3", age: 21),
        ]
    ),
]

for test in tests {
    var students = test.students
    group(&students)
    guard students == test.grouped else {
        print("For test students \(test.students), " +
            "expected grouped students to be \(test.grouped), but were \(students)")
        exit(1)
    }
}
