import Darwin

func shuffle<T>(array: [T]) -> [T] {
    var copy = array
    for i in 0..<array.count {
        let j = Int(arc4random_uniform(UInt32(array.count)))
        (copy[i], copy[j]) = (copy[j], copy[i])
    }
    return copy
}

let tests: [(numbers: [UInt8], missing: UInt8?)] = [
    (
        numbers: [5, 3, 11, 7, 9, 0, 2, 1, 10, 6, 4],
        missing: 8
    ),
    (
        numbers: shuffle([UInt8](UInt8(0).stride(through: UInt8.max, by: 1))),
        missing: nil
    ),
    (
        numbers: shuffle([UInt8](0...27) + [UInt8](UInt8(29).stride(through: UInt8.max, by: 1))),
        missing: 28
    ),
]

for test in tests {
    let missing = findMissingNumber(test.numbers)
    guard missing == nil && test.missing == nil || missing! == test.missing! else {
        print("For test numbers \(test.numbers), " +
            "expected missing to be \(test.missing), but was \(missing)")
        exit(1)
    }
}
