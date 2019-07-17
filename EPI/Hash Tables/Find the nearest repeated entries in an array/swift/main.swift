public func distanceOfClosestPair(_ words: [String]) -> Int? {
    var minDistance: Int?
    var lastIndexes = [String: Int]()

    for (index, word) in words.enumerated() {
        if let lastIndex = lastIndexes[word] {
            let distance = index - lastIndex
            if minDistance == nil || distance < minDistance! {
                minDistance = distance
            }
        }
        lastIndexes[word] = index
    }

    return minDistance
}
