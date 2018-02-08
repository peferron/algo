public func findDuplicateAndMissing(_ numbers: [Int]) -> (duplicate: Int, missing: Int) {
    let range = 0..<numbers.count

    let numbersXor = numbers.reduce(0, ^)
    let rangeXor = range.reduce(0, ^)

    let duplicateAndMissingXor = numbersXor ^ rangeXor

    let differingBit = duplicateAndMissingXor & ~(duplicateAndMissingXor - 1)

    let filteredNumbersXor = numbers.lazy.filter { $0 & differingBit != 0 }.reduce(0, ^)
    let filteredRangeXor = range.lazy.filter { $0 & differingBit != 0 }.reduce(0, ^)

    let duplicateOrMissing = filteredNumbersXor ^ filteredRangeXor
    let other = duplicateOrMissing ^ duplicateAndMissingXor

    return numbers.contains(duplicateOrMissing) ?
        (duplicate: duplicateOrMissing, missing: other) :
        (duplicate: other, missing: duplicateOrMissing)
}
