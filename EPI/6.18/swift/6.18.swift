// swiftlint:disable variable_name

typealias Pair = (row: Int, col: Int)

// "Intuitive" algorithm. Turns out to be a mess, partially because I didn't correctly read the
// problem description in the book and added support for non-square matrices.
public func spiralLines(matrix: [[Int]]) -> [Int] {
    if matrix.isEmpty {
        return []
    }

    var result = [Int]()
    var start = (row: 0, col: 0)
    var count = (row: matrix.count, col: matrix[0].count)

    while count.row > 0 && count.col > 0 {
        result += circle(matrix, start: start, count: count)
        start = (start.row + 1, start.col + 1)
        count = (count.row - 2, count.col - 2)
    }

    return result
}

func circle(matrix: [[Int]], start: Pair, count: Pair) -> [Int] {
    let end = (row: start.row + count.row - 1, col: start.col + count.col - 1)

    var result = line(matrix, start: start, direction: (0, 1), count: count.col)

    let downStart = (row: start.row + 1, col: end.col)
    result += line(matrix, start: downStart, direction: (1, 0), count: count.row - 1)

    if count.row > 1 {
        let leftStart = (row: end.row, col: end.col - 1)
        result += line(matrix, start: leftStart, direction: (0, -1), count: count.col - 1)
    }

    if count.col > 1 {
        let upStart = (row: end.row - 1, col: start.col)
        result += line(matrix, start: upStart, direction: (-1, 0), count: count.row - 2)
    }

    return result
}

func line(matrix: [[Int]], start: Pair, direction: Pair, count: Int) -> [Int] {
    guard count > 0 else {
        return []
    }
    return (0..<count).map { matrix[start.row + direction.row * $0][start.col + direction.col * $0]}
}

// Game-like algorithm where a snake (or Pacman, or whatever) changes direction clockwise every time
// it hits a wall, and the walls are closing in.
public func spiralSnake(matrix: [[Int]]) -> [Int] {
    let size = (rows: matrix.count, cols: matrix.first?.count ?? 0)
    guard size.rows > 0 && size.cols > 0 else {
        return []
    }

    var result = [Int]()
    var position = (row: 0, col: 0)
    var start = (row: 0, col: 0)
    var end = (row: size.rows - 1, col: size.cols - 1)
    var direction = (row: 0, col: 1)

    // We could replace the `for` loop below with:
    //     while start.row <= position.row && position.row <= end.row &&
    //         start.col <= position.col && position.col <= end.col
    // It would be a bit more intuitive, as "stop when there's nowhere left to go" is very well in
    // line with this game-like approach. The `for` loop requires less comparisons, though.
    for _ in 0..<size.rows * size.cols {
        result.append(matrix[position.row][position.col])

        switch direction {
        case (0, 1) where position.col == end.col:
            start.row += 1
            direction = (1, 0)
        case (1, 0) where position.row == end.row:
            end.col -= 1
            direction = (0, -1)
        case (0, -1) where position.col == start.col:
            end.row -= 1
            direction = (-1, 0)
        case (-1, 0) where position.row == start.row:
            start.col += 1
            direction = (0, 1)
        default:
            break
        }

        position = (position.row + direction.row, position.col + direction.col)
    }

    return result
}
