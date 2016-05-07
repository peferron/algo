// swiftlint:disable variable_name

// polygon must be provided in standard form, i.e. counter-clockwise order, distinct vertices, and
// no collinear vertices.
public func antipodalPairs(polygon: [Point]) -> [Pair] {
    var (lower, upper) = lowerAndUpperHull(polygon)
    var pairs = [Pair]()
    var l = 0
    var u = 0

    while l < lower.count - 1 || u < upper.count - 1 {
        pairs.append((lower[l], upper[u]))

        if l == lower.count - 1 {
            // The lower hull is done. Keep going with the upper hull.
            u += 1
            continue
        }

        if u == upper.count - 1 {
            // The upper hull is done. Keep going with the lower hull.
            l += 1
            continue
        }

        // The initial caliper position is two vertical edges: the vertical edge on the left is in
        // contact with lower[0], and the vertical edge on the right is in contact with upper[0].
        // If we rotate the caliper counter-clockwise, which polygon segment will align with the
        // caliper next? Will it be lower[0, 1], or upper[0, 1]? To find out, we need to compare
        // the slope of these two segments. The segment with the lowest slope will align with the
        // caliper first.
        let lowerDeltaY =  lower[l + 1].y - lower[l].y
        let lowerDeltaX = lower[l + 1].x - lower[l].x
        let upperDeltaY = upper[u].y - upper[u + 1].y
        let upperDeltaX = upper[u].x - upper[u + 1].x

        // We want to find out if lowerDeltaY / lowerDeltaX < upperDeltaY / upperDeltaX.
        // This can cause issues with divisions by 0. We can get around that by multiplying both
        // sides of the comparison with the denominators.
        let comparison = lowerDeltaY * upperDeltaX - upperDeltaY * lowerDeltaX
        if comparison < 0 {
            // The lower segment aligns first.
            l += 1
        } else if comparison > 0 {
            // The upper segment aligns first.
            u += 1
        } else {
            // Both segments are parallel, so they align at the same time. We arbitrarily decide to
            // act as if the lower segment aligned first, but that means we need to manually append
            // the pair that would have been appended if we had picked the upper segment instead.
            pairs.append((lower[l], upper[u + 1]))
            l += 1
        }
    }

    return pairs
}

func lowerAndUpperHull(polygon: [Point]) -> ([Point], [Point]) {
    // Tried going for a reduce, but it was unreadable. At the time of this writing, Swift doesn't
    // seem to be able to destructure nested tuples.
    var lowerStart = 0
    var upperStart = 0
    for i in 1..<polygon.count {
        if polygon[i] < polygon[lowerStart] {
            lowerStart = i
        }
        if polygon[i] > polygon[upperStart] {
            upperStart = i
        }
    }

    let lower = arc(polygon, fromIndex: lowerStart, toIndex: upperStart)
    let upper = arc(polygon, fromIndex: upperStart, toIndex: lowerStart)
    return (lower, upper)
}

func arc(polygon: [Point], fromIndex: Int, toIndex: Int) -> [Point] {
    var arc = [Point]()

    for i in fromIndex..<Int.max {
        let index = i % polygon.count
        arc.append(polygon[index])
        if index == toIndex {
            break
        }
    }

    return arc
}

public func diameter(polygon: [Point]) -> Pair {
    let pairs = antipodalPairs(polygon)
    return pairs.reduce(pairs[0]) { (best, pair) in
        return distanceSquared(pair) > distanceSquared(best) ? pair : best
    }
}

func distanceSquared(pair: Pair) -> Int {
    let deltaX = abs(pair.0.x - pair.1.x)
    let deltaY = abs(pair.0.y - pair.1.y)
    return deltaX * deltaX + deltaY + deltaY
}
