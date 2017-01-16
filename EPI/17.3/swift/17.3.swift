public func traversalsCountDynamicProgramming(rows: Int, cols: Int) -> Int {
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

public func traversalsCountMath(rows n: Int, cols m: Int) -> Int {
    // All traversals contain n-1 down-moves and m-1 right-moves.
    // The only thing that changes is the order of these moves.
    // In total we have n-1 + m-1 = n+m-2 moves.
    // Once we pick the position of e.g. all n-1 down-moves amoung these n+m-2 total moves, then the
    // traversal is fully defined (the right-moves will take the leftover spots).
    // So the total number of traversals is "from n+m-2 pick n-1".
    // Since "from n pick k" is equal to n! / k!(n-k)!, the total number of traversals is equal to
    // (n+m-2)! / (n-1)!(m-1)!.
    // Expanded, it becomes (n-m-2)(n-m-1)...(n-1)! / (n-1)!(m-1)!.
    // If we remove the (n-1)! from both sides, it becomes (n-m-2)(n-m-3)...(n) / (m-1)(m-2)...(1).
    // Both sides have m-1 terms, and the result can be computed in a single loop.

    var count = 1

    for i in 0..<m - 1 {
        count = count * (n + i) / (1 + i)
    }

    return count
}
