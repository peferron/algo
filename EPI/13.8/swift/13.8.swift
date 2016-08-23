public func digest(article: [String], search: Set<String>) -> Range<Int>? {
    var bestRange: Range<Int>?
    var currentRange = 0..<0
    var currentSearchCounts = [String: Int]()

    while true {
        if currentSearchCounts.count < search.count {
            // The current range is missing some search words. Increment the end index to try to
            // include all search words.
            if currentRange.endIndex == article.count {
                break
            }
            let incomingWord = article[currentRange.endIndex]
            currentRange.endIndex += 1
            if search.contains(incomingWord) {
                currentSearchCounts[incomingWord] = (currentSearchCounts[incomingWord] ?? 0) + 1
            }
        } else {
            // The current range contains all search words. Increment the start index to try to
            // reduce the range count.
            if bestRange == nil || currentRange.count < bestRange!.count {
                bestRange = currentRange
            }
            let outgoingWord = article[currentRange.startIndex]
            currentRange.startIndex += 1
            if let count = currentSearchCounts[outgoingWord] where count > 1 {
                currentSearchCounts[outgoingWord] = count - 1
            } else {
                currentSearchCounts.removeValueForKey(outgoingWord)
            }
        }
    }

    return bestRange
}
