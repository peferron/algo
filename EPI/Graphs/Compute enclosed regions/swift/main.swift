public enum Color: Int {
    case White = 0
    case Black = 1
}

private typealias Coord = (row: Int, col: Int)

// Fancy extension for using `grid[coord]` instead of `grid[coord.row][coord.col]`.
private extension Array where Element: MutableCollection {
    subscript(tuple: (Index, Element.Index)) -> Element.Iterator.Element  {
        get {
            return self[tuple.0][tuple.1]
        }
        set(newValue) {
            self[tuple.0][tuple.1] = newValue
        }
    }
}

public func fillEnclosed(_ grid: inout [[Color]]) {
    var visited = grid.map { $0.map { $0 == .Black } }

    for row in 0..<grid.count {
        for col in 0..<grid[row].count {
            let coord = (row, col)

            if !visited[coord] {
                let enclosed = visitRegion(coord, in: grid, visited: &visited)
                if enclosed {
                    fillRegion(coord, in: &grid)
                }
            }
        }
    }
}

private func visitRegion(_ coord: Coord, in grid: [[Color]], visited: inout [[Bool]]) -> Bool {
    visited[coord] = true

    // Do not return early here. All cells in the region need to be marked as visited.
    var enclosed = !onBorder(coord, in: grid)

    for neighbor in neighbors(coord, in: grid) where !visited[coord] {
        if !visitRegion(neighbor, in: grid, visited: &visited) {
            enclosed = false
        }
    }

    return enclosed
}

private func fillRegion(_ coord: Coord, in grid: inout [[Color]]) {
    grid[coord] = .Black

    for neighbor in neighbors(coord, in: grid) where grid[neighbor] == .White {
        fillRegion(neighbor, in: &grid)
    }
}

private func onBorder(_ coord: Coord, in grid: [[Color]]) -> Bool {
    return coord.row == 0 || coord.row == grid.count - 1 ||
        coord.col == 0 || coord.col == grid[coord.row].count - 1
}

private func neighbors(_ coord: Coord, in grid: [[Color]]) -> [Coord] {
    let (row, col) = coord

    let potentialNeighbors = [
        (row - 1, col),
        (row + 1, col),
        (row, col - 1),
        (row, col + 1),
    ]

    return potentialNeighbors.filter { (r, c) in
        r >= 0 && r < grid.count &&
        c >= 0 && c < grid[r].count
    }
}
