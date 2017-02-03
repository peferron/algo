public enum Color: Int {
    case White = 0
    case Black = 1
}

public typealias Coord = (row: Int, col: Int)

public func flipRegion(_ cell: Coord, in image: inout [[Color]]) {
    let color = image[cell.row][cell.col]
    image[cell.row][cell.col] = color == .White ? .Black : .White

    for neighbor in neighbors(cell, in: image) where image[neighbor.row][neighbor.col] == color {
        flipRegion(neighbor, in: &image)
    }
}

private func neighbors(_ cell: Coord, in image: [[Color]]) -> [Coord] {
    let (row, col) = cell

    let potentialNeighbors = [
        (row - 1, col),
        (row + 1, col),
        (row, col - 1),
        (row, col + 1),
    ]

    return potentialNeighbors.filter { (r, c) in
        r >= 0 && r < image.count &&
        c >= 0 && c < image[r].count
    }
}
