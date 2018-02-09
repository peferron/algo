public func maxPair(lineHeights: [Int]) -> (Int, Int) {
    var start = 0
    var end = lineHeights.count - 1

    var bestPair = (start, end)
    var bestQuantity = 0

    while start < end {
        let startHeight = lineHeights[start]
        let endHeight = lineHeights[end]
        let quantity = (end - start) * min(startHeight, endHeight)

        if quantity > bestQuantity {
            bestPair = (start, end)
            bestQuantity = quantity
        }

        if startHeight <= endHeight {
            start += 1
        }
        if startHeight >= endHeight {
            end -= 1
        }
    }

    return bestPair
}
