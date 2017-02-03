public enum Status {
    case Empty
    case Blocked
}

public typealias Coord = (row: Int, col: Int)

public func path(from start: Coord, to end: Coord, in maze: inout [[Status]]) -> [Coord]? {
    if start == end {
        // We have found the end vertex.
        return [start]
    }

    // Mark the start vertex as visited.
    maze[start.row][start.col] = .Blocked

    for neighbor in neighbors(start, in: maze) {
        if let p = path(from: neighbor, to: end, in: &maze) {
            // A recursive call has found the end vertex.
            return [start] + p
        }
    }

    // No path to the end vertex was found.
    return nil
}

private func neighbors(_ coord: Coord, in maze: [[Status]]) -> [Coord] {
    let (row, col) = coord

    let potentialNeighbors = [
        (row - 1, col),
        (row + 1, col),
        (row, col - 1),
        (row, col + 1),
    ]

    return potentialNeighbors.filter { (r, c) in
        r >= 0 && r < maze.count &&
        c >= 0 && c < maze[r].count &&
        maze[r][c] == .Empty
    }
}
