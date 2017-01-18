private typealias Cell = (i: Int, j: Int)

public func contains(grid: [[Int]], sequence: [Int]) -> Bool {
    if sequence.isEmpty {
        return true
    }

    // results[i][j][k] is true if there exists a path starting at cell (i, j) that contains the
    // sequence suffix of length k.
    var results = grid.map { row in
        row.map { _ in [Int: Bool]() }
    }

    return grid.enumerated().contains { (i, row) in
        row.enumerated().contains { (j, _) in
            contains(grid: grid, sequence: ArraySlice(sequence), start: (i, j), results: &results)
        }
    }
}

private func contains(grid: [[Int]], sequence: ArraySlice<Int>, start: Cell, results: inout [[[Int: Bool]]]) -> Bool {
    // Check if the result is cached.
    if let result = results[start.i][start.j][sequence.count] {
        return result
    }

    let result: Bool

    if grid[start.i][start.j] != sequence.first! {
        // We cannot even match the first element.
        result = false
    } else if sequence.count == 1 {
        // We matched the entire sequence!
        result = true
    } else {
        // We matched the first element, but can we also match the next elements?
        result = neighbors(grid: grid, cell: start).contains { neighbor in
            contains(grid: grid, sequence: sequence.dropFirst(), start: neighbor, results: &results)
        }
    }

    // Cache the result.
    results[start.i][start.j][sequence.count] = result

    return result
}

private func neighbors(grid: [[Int]], cell: Cell) -> [Cell] {
    return [
        (cell.i - 1, cell.j),
        (cell.i + 1, cell.j),
        (cell.i, cell.j - 1),
        (cell.i, cell.j + 1),
    ].filter { neighbor in
        neighbor.i >= 0 && neighbor.i < grid.count && neighbor.j >= 0 && neighbor.j < grid[0].count
    }
}
