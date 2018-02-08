public func isValid(grid: [[Int]]) -> Bool {
    for i in 0..<9 {
        guard isValid(grid, row: i, col: 0, rowCount: 1, colCount: 9) &&
            isValid(grid, row: 0, col: i, rowCount: 9, colCount: 1) else {
            return false
        }
    }

    // We could merge this check in the previous loop like this:
    //     isValid(grid, row: 3 * (i / 3), col: 3 * (i % 3), rowCount: 3, colCount: 3)
    // But it's serious code golfing.
    for row in stride(from: 0, to: 9, by: 3) {
        for col in stride(from: 0, to: 9, by: 3) {
            guard isValid(grid, row: row, col: col, rowCount: 3, colCount: 3) else {
                return false
            }
        }
    }

    return true
}

func isValid(_ grid: [[Int]], row: Int, col: Int, rowCount: Int, colCount: Int) -> Bool {
    var set = Set<Int>()

    for i in row..<row + rowCount {
        for j in col..<col + colCount {
            let value = grid[i][j]
            if value != 0 {
                if set.contains(value) {
                    return false
                }
                set.insert(value)
            }
        }
    }

    return true

    // Alternate version, shorter but slower since it doesn't return on the first duplicate and
    // allocates new arrays:
    //    let subgrid = grid[row..<row + rowCount].map { $0[col..<col + colCount] }
    //    let values = subgrid.flatten().filter { $0 != 0 }
    //    return Set(values).count == values.count
}
