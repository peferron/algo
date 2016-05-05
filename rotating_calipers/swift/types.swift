// We do not need to implement < for Point because Swift already compares tuples lexicographically.
public typealias Point = (Int, Int)

public typealias Pair = (Point, Point)

func canonical(pair: Pair) -> Pair {
    return pair.0 < pair.1 ? pair : (pair.1, pair.0)
}

// Pairs are compared lexicographically, ignoring the order of the points.
public func < (lhs: Pair, rhs: Pair) -> Bool {
    let canonLhs = canonical(lhs)
    let canonRhs = canonical(rhs)
    return canonLhs.0 < canonRhs.0 || canonLhs.0 == canonRhs.0 && canonLhs.1 < canonRhs.1
}

// Pair equality ignores the order of the points.
public func == (lhs: Pair, rhs: Pair) -> Bool {
    let canonLhs = canonical(lhs)
    let canonRhs = canonical(rhs)
    return canonLhs.0 == canonRhs.0 && canonLhs.1 == canonRhs.1
}

public func == (lhs: [Pair], rhs: [Pair]) -> Bool {
    guard lhs.count == rhs.count else {
        return false
    }

    for (index, value) in lhs.enumerate() {
        guard value == rhs[index] else {
            return false
        }
    }

    return true
}
