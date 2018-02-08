// swiftlint:disable variable_name

public func findUnusedNumber(numbers: [UInt8]) -> UInt8? {
    var unused: UInt8 = 0

    // We process from the most significant bit (7th bit) down to the least significant bit (0th
    // bit). This makes this algorithm return the lowest unused number, which can be a nice property
    // to have.
    for i: UInt8 in (0..<8).reverse() {
        // Consider only the numbers that have the same 0...i bits as unused.
        let mask = i == 7 ? 0 : UInt8.max << i

        // Count how many numbers have their ith bit set to 0 and 1.
        var zeroCount = 0
        var oneCount = 0

        for number in numbers where number & mask == unused & mask {
            if (number >> i) & 1 == 1 {
                oneCount += 1
            } else {
                zeroCount += 1
            }
        }

        let combinationCount = 1 << Int(i)
        if zeroCount < combinationCount {
            // There is an unused number with its ith bit set to 0.
            // unused is initialized with 0s by default, so do nothing!
        } else if oneCount < combinationCount {
            // There is an unused number with its ith bit set to 1.
            unused |= (1 << i)
        } else {
            // All combinations are taken; there is no unused number.
            return nil
        }
    }

    return unused
}
