// Bit array implementation. Fails if set contains more elements than the number of bits in an Int.
public func powerSet(_ set: [Int]) -> [[Int]] {
    // A bit array with all n bits set to 1 has a value of 2^n - 1.
    let max = 1 << set.count - 1

    // Iterating from 0 to max will give us all the different subsets of set.
    return (0...max).map { bitArray in
        subset(set, selected: bitArray)
    }
}

private func subset(_ set: [Int], selected originalBitArray: Int) -> [Int] {
    var bitArray = originalBitArray
    var subset = [Int]()

    while bitArray > 0 {
        let bitArrayWithoutLowestBit = bitArray & (bitArray - 1)
        let valueOfLowestBit = bitArray - bitArrayWithoutLowestBit
        let indexOfLowestBit = Int(log2(Double(valueOfLowestBit)))

        subset.append(set[indexOfLowestBit])

        bitArray = bitArrayWithoutLowestBit
    }

    return subset
}

// Recursive implementation.
/*
public func powerSet(_ set: [Int]) -> [[Int]] {
    if set.isEmpty {
        return [[]]
    }

    var rest = set
    let first = rest.removeFirst()

    let restPowerSet = powerSet(rest)
    let firstPowerSet = restPowerSet.map { $0 + [first] }

    return restPowerSet + firstPowerSet
}
*/
