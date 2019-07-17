public func digest(article: [String], search: Set<String>) -> Range<Int>? {
    var bestRange: Range<Int>?
    var currentRangeStart = 0
    var currentRangeEnd = 0
    var currentSearchCounts = [String: Int]()

    while true {
        if currentSearchCounts.count < search.count {
            // The current range is missing some search words. Increment the end index to try to
            // include all search words.
            if currentRangeEnd == article.count {
                break
            }
            let incomingWord = article[currentRangeEnd]
            currentRangeEnd += 1
            if search.contains(incomingWord) {
                currentSearchCounts[incomingWord] = (currentSearchCounts[incomingWord] ?? 0) + 1
            }
        } else {
            // The current range contains all search words. Increment the start index to try to
            // reduce the range count.
            if bestRange == nil || currentRangeEnd - currentRangeStart < bestRange!.count {
                bestRange = currentRangeStart..<currentRangeEnd
            }
            let outgoingWord = article[currentRangeStart]
            currentRangeStart += 1
            if let count = currentSearchCounts[outgoingWord], count > 1 {
                currentSearchCounts[outgoingWord] = count - 1
            } else {
                currentSearchCounts.removeValue(forKey: outgoingWord)
            }
        }
    }

    return bestRange
}
