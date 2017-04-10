private typealias Cell = (i: Int, j: Int)

public func contains(grid: [[Int]], sequence: [Int]) -> Bool {
    if sequence.isEmpty {
        return true
    }

    // impossible[i][j] contains k if there is no path starting at (i, j) that retraces the sequence
    // suffix of length k.
    var impossible = grid.map { row in
        row.map { _ in Set<Int>() }
    }

    return grid.enumerated().contains { (i, row) in
        row.enumerated().contains { (j, _) in
            contains(grid: grid, sequence: ArraySlice(sequence), start: (i, j), impossible: &impossible)
        }
    }
}

private func contains(grid: [[Int]], sequence: ArraySlice<Int>, start: Cell, impossible: inout [[Set<Int>]]) -> Bool {
    if impossible[start.i][start.j].contains(sequence.count) {
        return false
    }

    if grid[start.i][start.j] == sequence.first! {
        // The first element matches, but what about the rest?
        let remaining = sequence.dropFirst()

        if remaining.isEmpty || neighbors(grid: grid, cell: start).contains { neighbor in
            contains(grid: grid, sequence: remaining, start: neighbor, impossible: &impossible)
        } {
            return true
        }
    }

    // Cache this failure.
    impossible[start.i][start.j].insert(sequence.count)
    return false
}

private func neighbors(grid: [[Int]], cell: Cell) -> [Cell] {
    return [
        (cell.i - 1, cell.j),
        (cell.i + 1, cell.j),
        (cell.i, cell.j - 1),
        (cell.i, cell.j + 1),
    ].filter { neighbor in
        neighbor.i >= 0 && neighbor.i < grid.count &&
        neighbor.j >= 0 && neighbor.j < grid[neighbor.i].count
    }
}
