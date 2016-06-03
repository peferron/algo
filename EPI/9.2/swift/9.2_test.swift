import Darwin

let tests: [(expression: String, result: Int)] = [
    ("1", 1),
    ("-1", -1),
    ("2,3,+", 5),
    ("5,2,-", 3),
    ("2,3,*", 6),
    ("6,2,/", 3),
    ("1,3,+,5,7,8,+,*,-", -71),
]

for test in tests {
    let result = evaluate(test.expression)!
    guard result == test.result else {
        print("For expression \(test.expression), " +
            "expected evaluated result to be \(test.result), but was \(result)")
        exit(1)
    }
}
