public typealias Move = (from: Peg, to: Peg)

public enum Peg {
    case P1
    case P2
    case P3
}

public func hanoi(count: Int) -> [Move] {
    return hanoi(count: count, from: .P1, to: .P2, using: .P3)
}

private func hanoi(count: Int, from origin: Peg, to destination: Peg, using temporary: Peg) -> [Move] {
    if count < 1 {
        return []
    }

    return
        // Move all origin rings except one to the temporary peg.
        hanoi(count: count - 1, from: origin, to: temporary, using: destination) +
        // Then move the last remaining origin ring to the destination peg.
        [(from: origin, to: destination)] +
        // Finally, move all temporary rings to the destination peg.
        hanoi(count: count - 1, from: temporary, to: destination, using: origin)
}
