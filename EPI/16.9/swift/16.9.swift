private typealias Cell = (row: Int, col: Int)

public func solve(_ problem: [[Int?]]) -> [[Int]] {
    return tryToSolve(problem)!
}

public func tryToSolve(_ problem: [[Int?]]) -> [[Int]]? {
    let empty = firstEmptyCell(problem)

    if empty == nil {
        // Problem solved! We just need to unwrap all optionals.
        return problem.map { $0.map { $0! } }
    }

    // Try to find a solution for each possible value in the empty cell.
    for value in 1...9 {
        if !isValid(value: value, inCell: empty!, ofProblem: problem) {
            continue
        }

        var attempt = problem
        attempt[empty!.row][empty!.col] = value

        if let solution = tryToSolve(attempt) {
            return solution
        }
    }

    // This problem has no solution.
    return nil
}

private func firstEmptyCell(_ problem: [[Int?]]) -> Cell? {
    for row in 0..<9 {
        for col in 0..<9 {
            if problem[row][col] == nil {
                return (row, col)
            }
        }
    }
    return nil
}

// Rules of Sudoku: each column, each row, and reach of the nine 3x3 sub-grids that compose the grid
// must contain unique integers in [1, 9].
private func isValid(value: Int, inCell cell: Cell, ofProblem problem: [[Int?]]) -> Bool {
    // Verify that there are no duplicates in the row.
    for col in 0..<9 {
        if let v = problem[cell.row][col], v == value {
            return false
        }
    }

    // Verify that there are no duplicates in the column.
    for row in 0..<9 {
        if let v = problem[row][cell.col], v == value {
            return false
        }
    }

    // Verify that there are no duplicates in the sub-grid.
    let firstSubgridCell = (
        row: 3 * (cell.row / 3),
        col: 3 * (cell.col / 3)
    )
    for row in firstSubgridCell.row..<firstSubgridCell.row + 3 {
        for col in firstSubgridCell.col..<firstSubgridCell.col + 3 {
            if let v = problem[row][col], v == value {
                return false
            }
        }
    }

    return true
}
