public func largestContainedIntervalLength(_ values: [Int]) -> Int {
    var set = Set<Int>(values)
    var maxLength = 0

    while let value = set.popFirst() {
        var lower = value - 1
        while set.remove(lower) != nil {
            lower -= 1
        }

        var higher = value + 1
        while set.remove(higher) != nil {
            higher += 1
        }

        let length = higher - lower - 1
        maxLength = max(length, maxLength)
    }

    return maxLength
}
