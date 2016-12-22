// We do not need to implement < for Point because Swift already compares tuples lexicographically.
public typealias Point = (x: Int, y: Int)

public typealias Edge = (Point, Point)

func canonical(_ edge: Edge) -> Edge {
    return edge.0 < edge.1 ? edge : (edge.1, edge.0)
}

// Edges are compared lexicographically, ignoring the order of the points.
public func < (lhs: Edge, rhs: Edge) -> Bool {
    let canonLhs = canonical(lhs)
    let canonRhs = canonical(rhs)
    return canonLhs.0 < canonRhs.0 || canonLhs.0 == canonRhs.0 && canonLhs.1 < canonRhs.1
}

// Edge equality ignores the order of the points.
public func == (lhs: Edge, rhs: Edge) -> Bool {
    let canonLhs = canonical(lhs)
    let canonRhs = canonical(rhs)
    return canonLhs.0 == canonRhs.0 && canonLhs.1 == canonRhs.1
}

public func != (lhs: Edge, rhs: Edge) -> Bool {
    return !(lhs == rhs)
}

public func == (lhs: [Edge], rhs: [Edge]) -> Bool {
    guard lhs.count == rhs.count else {
        return false
    }

    for (index, value) in lhs.enumerated() {
        guard value == rhs[index] else {
            return false
        }
    }

    return true
}
