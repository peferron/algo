public func longestNondecreasingSubsequenceLength(_ sequence: [Int]) -> Int {
    // lengths[i] is the length of the longest nondecreasing subsequence ending with sequence[i].
    var lengths = [Int]()

    for (curIndex, curValue) in sequence.enumerated() {
        var curLength = 1

        for (prevIndex, prevValue) in sequence[0..<curIndex].enumerated() {
            if prevValue <= curValue {
                curLength = max(curLength, lengths[prevIndex] + 1)
            }
        }

        lengths.append(curLength)
    }

    return lengths.max() ?? 0
}
