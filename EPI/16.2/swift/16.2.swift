public typealias Placement = [Int]

public func nonAttackingPlacements(n: Int) -> [Placement] {
    return nonAttackingPlacements(n: n, extending: [])
}

private func nonAttackingPlacements(n: Int, extending partial: Placement) -> [Placement] {
    if partial.count == n {
        return [partial]
    }

    let row = partial.count

    return (0..<n).flatMap { col -> [Placement] in
        if isAttacking(position: (row, col), placement: partial) {
            return []
        }
        let extended = partial + [col]
        return nonAttackingPlacements(n: n, extending: extended)
    }
}

private func isAttacking(position: (row: Int, col: Int), placement: Placement) -> Bool {
    return placement.enumerated().contains { placementPosition in
        isAttacking(position: position, otherPosition: placementPosition)
    }
}

private func isAttacking(position a: (row: Int, col: Int), otherPosition b: (row: Int, col: Int)) -> Bool {
    return a.row == b.row || // Row attack.
        a.col == b.col || // Column attack.
        abs(a.row - b.row) == abs(a.col - b.col) // Diagonal attack.
}
