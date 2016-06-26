import Darwin

func shuffle<T>(array: [T]) -> [T] {
    var copy = array
    for i in 0..<array.count {
        let j = Int(arc4random_uniform(UInt32(array.count)))
        (copy[i], copy[j]) = (copy[j], copy[i])
    }
    return copy
}

let tests: [(numbers: [UInt8], unused: UInt8?)] = [
    (
        numbers: [5, 3, 11, 7, 9, 0, 2, 1, 10, 6, 4],
        unused: 8
    ),
    (
        numbers: shuffle([UInt8](UInt8(0).stride(through: UInt8.max, by: 1))),
        unused: nil
    ),
    (
        numbers: shuffle([UInt8](0...27) + [UInt8](UInt8(29).stride(through: UInt8.max, by: 1))),
        unused: 28
    ),
]

for test in tests {
    let unused = findUnusedNumber(test.numbers)
    guard unused == nil && test.unused == nil || unused! == test.unused! else {
        print("For test numbers \(test.numbers), " +
            "expected unused to be \(test.unused), but was \(unused)")
        exit(1)
    }
}
