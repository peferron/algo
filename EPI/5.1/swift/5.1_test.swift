import Darwin

let fns = [parityBruteforceReduce, parityBruteforceLoop, parityBruteforceDropLowestBit, parityXor]

let tests: [(value: UInt64, parity: UInt)] = [
    (value: 0, parity: 0),
    (value: 1, parity: 1),
    (value: 2, parity: 1),
    (value: 3, parity: 0),
    (value: 5277, parity: 1),
    (value: UInt64.max, parity: 0),
]

for fn in fns {
    for test in tests {
        let actual = fn(test.value)
        guard actual == test.parity else {
            print("For value \(test.value), expected parity \(test.parity), but was \(actual)")
            exit(1)
        }
    }
}

for i in 0...1000 {
    var value: UInt64 = 0
    arc4random_buf(&value, sizeof(UInt64))

    let parities = fns.map { $0(value) }
    guard Set(parities).count == 1 else {
        print("For value \(value), got different parities \(parities)")
        exit(1)
    }
}
