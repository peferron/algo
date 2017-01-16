public func traversalsCount(rows: Int, cols: Int) -> Int {

    // counts[row][col] is the number of ways to reach the cell at (row, col).
    var counts = [[Int]](repeating: [Int](repeating: 0, count: cols), count: rows)

    // Base cases: there is only one way to reach the cells along the top or left edge.
    for col in 0..<cols {
        counts[0][col] = 1
    }
    for row in 0..<rows {
        counts[row][0] = 1
    }

    // The cell at (row, col) can be reached either by:
    // - Moving down from the cell at (row-1, col)
    // - Moving right from the cell at (row, col-1)
    for row in 1..<rows {
        for col in 1..<cols {
            counts[row][col] = counts[row - 1][col] + counts[row][col - 1]
        }
    }

    return counts.last!.last!
}
