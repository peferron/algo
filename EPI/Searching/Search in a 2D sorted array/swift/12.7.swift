public func contains<T: Comparable>(matrix matrix: [[T]], element: T) -> Bool {
    guard matrix.count > 0 && matrix[0].count > 0 else {
        return false
    }

    var firstRow = 0
    var lastCol = matrix[0].count - 1

    while firstRow < matrix.count && lastCol >= 0 {
        let topRight = matrix[firstRow][lastCol]

        if topRight == element {
            return true
        }

        if topRight > element {
            lastCol -= 1
        } else {
            firstRow += 1
        }
    }

    return false
}
