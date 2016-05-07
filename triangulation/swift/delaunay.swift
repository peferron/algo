// swiftlint:disable comma
// swiftlint:disable variable_name

class HalfEdge: CustomStringConvertible {
    var dirty = true // Used during flipping.

    var origin: Point
    var twin: HalfEdge!

    // Half-edges on the outside of the convex hull never have next half-edges.
    var next: HalfEdge?

    // Since we only handle triangulations, we don't need to store a pointer to the previous
    // half-edge.
    var prev: HalfEdge? {
        return self.next?.next
    }

    var locallyDelaunay: Bool {
        // Edges on the convex hull cannot be flipped and are considered locally delaunay for
        // simplicity.
        if next == nil || twin.next == nil {
            return true
        }

        // The triangles needs to be in counter-clockwise order.
        let triangle1 = (origin, next!.origin, prev!.origin)
        let opposite1 = twin.prev!.origin
        let triangle2 = (twin.origin, twin.next!.origin, twin.prev!.origin)
        let opposite2 = prev!.origin
        return !inCircumcircle(triangle1, point: opposite1) &&
            !inCircumcircle(triangle2, point: opposite2)
    }

    var description: String {
        return "\(origin) -> \(twin.origin)\(next == nil ? " without next" : "")"
    }

    init(origin: Point) {
        self.origin = origin
    }

    func flip() {
        // Only the half-edges inside the quadrilateral are changed; half-edges outside the
        // quadrilateral are unchanged, because the quadrilateral doesn't change shape after a flip.
        // This means we have 6 half-edges to update: self, next, prev, twin, twin.next and
        // twin.prev. I won't comment each update because the best way to figure it out is with a
        // before/after drawing.

        let n = next!
        let p = prev!
        let t = twin
        let tn = twin.next!
        let tp = twin.prev!

        origin = p.origin
        next = tp

        t.origin = tp.origin
        t.next = p

        n.next = self
        p.next = tn
        tn.next = t
        tp.next = n
    }
}

func determinant4x4(m: [Int]) -> Int {
    // Ugly and lifted from Stack Overflow, but:
    // - Calculating determinants is not the point of this module. For fancier calculation methods,
    //   see the `determinant` module.
    // - In this particular situation, we know that the matrix is always going to be 4x4, so a
    //   hardcoded formula is likely to be faster and less bug-prone than more general methods.
    return m[12] * m[9]  * m[6]  * m[3]   -  m[8] * m[13] * m[6]  * m[3]   -
           m[12] * m[5]  * m[10] * m[3]   +  m[4] * m[13] * m[10] * m[3]   +
           m[8]  * m[5]  * m[14] * m[3]   -  m[4] * m[9]  * m[14] * m[3]   -
           m[12] * m[9]  * m[2]  * m[7]   +  m[8] * m[13] * m[2]  * m[7]   +
           m[12] * m[1]  * m[10] * m[7]   -  m[0] * m[13] * m[10] * m[7]   -
           m[8]  * m[1]  * m[14] * m[7]   +  m[0] * m[9]  * m[14] * m[7]   +
           m[12] * m[5]  * m[2]  * m[11]  -  m[4] * m[13] * m[2]  * m[11]  -
           m[12] * m[1]  * m[6]  * m[11]  +  m[0] * m[13] * m[6]  * m[11]  +
           m[4]  * m[1]  * m[14] * m[11]  -  m[0] * m[5]  * m[14] * m[11]  -
           m[8]  * m[5]  * m[2]  * m[15]  +  m[4] * m[9]  * m[2]  * m[15]  +
           m[8]  * m[1]  * m[6]  * m[15]  -  m[0] * m[9]  * m[6]  * m[15]  -
           m[4]  * m[1]  * m[10] * m[15]  +  m[0] * m[5]  * m[10] * m[15]
}

func square(value: Int) -> Int {
    return value * value
}

func inCircumcircle(triangle: (Point, Point, Point), point: Point) -> Bool {
    return determinant4x4([
        triangle.0.x,   triangle.0.y,   square(triangle.0.x) + square(triangle.0.y),   1,
        triangle.1.x,   triangle.1.y,   square(triangle.1.x) + square(triangle.1.y),   1,
        triangle.2.x,   triangle.2.y,   square(triangle.2.x) + square(triangle.2.y),   1,
        point.x,        point.y,        square(point.x) + square(point.y),             1,
    ]) > 0
}

// Compare a and b based on the clockwise angle the rays origin->a and origin->b form relatively to
// to the ray going straight up from origin (i.e. the "12 o'clock").
// We can ignore some edges cases because we know that for this application:
// - a, b and origin are always distinct
// - if a, b and origin are collinear then origin must be the middle point
func compareClockwise(a: Point, lessThan b: Point, origin: Point) -> Bool {
    // Handle case where a and b are not on the same vertical half of the plane.
    if a.x >= origin.x && b.x < origin.x {
        return true
    }
    if b.x >= origin.x && a.x < origin.x {
        return false
    }

    switch direction(a, origin, b) {
    case .Collinear:
        //  One of a, b is on the "12 o'clock" and the other is on the "6 o'clock".
        return a.y > b.y

    case .CounterClockwise:
        return true

    case .Clockwise:
        return false
    }
}

func doublyConnectedEdgeList(edges: [Edge]) -> [HalfEdge] {
    var halfEdges = [HalfEdge]()

    // Create all half-edges without setting their 'next' property yet, and keep a mapping between
    // origins and half-edges.
    for edge in edges {
        let he1 = HalfEdge(origin: edge.0)
        let he2 = HalfEdge(origin: edge.1)
        he1.twin = he2
        he2.twin = he1
        halfEdges += [he1, he2]
    }

    // Sort the half-edges by origin first, and then by clockwise order.
    halfEdges.sortInPlace {
        $0.origin < $1.origin || $0.origin == $1.origin &&
            compareClockwise($0.twin.origin, lessThan: $1.twin.origin, origin: $0.origin)
    }

    // For each pair (he1, he2) of half-edges with the same origin and in clockwise order, set the
    // 'next' property of he1.twin to he2. Remarks:
    // - We need to wrap and process the pair (last, first) of half-edges with the same origin.
    // - To avoid setting the 'next' property of half-edges that are on the outside of the convex
    //   hull, we need to check that the two half-edges form a triangle, i.e. that he1-he2 form a
    //   counter-clockwise turn.
    var first = halfEdges[0]
    for i in 0..<halfEdges.count {
        let he1 = halfEdges[i]
        var he2: HalfEdge!

        if i == halfEdges.count - 1 {
            he2 = first
        } else if halfEdges[i + 1].origin == he1.origin {
            he2 = halfEdges[i + 1]
        } else {
            he2 = first
            first = halfEdges[i + 1]
        }

        if direction(he1.twin.origin, he1.origin, he2.twin.origin) == .CounterClockwise {
            he1.twin.next = he2
        }
    }

    return halfEdges
}

func flipUntilDelaunay(halfEdges: [HalfEdge]) {
    var dirty = halfEdges

    while !dirty.isEmpty {
        let he = dirty.removeLast()
        he.dirty = false

        if he.locallyDelaunay {
            continue
        }

        he.flip()

        let neighbors = [he.next!, he.prev!, he.twin.next!, he.twin.prev!]
        for neighbor in neighbors where !neighbor.dirty {
            neighbor.dirty = true
            dirty.append(neighbor)
        }
    }
}

public func delaunay(triangulation: [Edge]) -> [Edge] {
    let halfEdges = doublyConnectedEdgeList(triangulation)
    flipUntilDelaunay(halfEdges)
    return deduplicate(halfEdges.map { ($0.origin, $0.twin.origin) })
}
