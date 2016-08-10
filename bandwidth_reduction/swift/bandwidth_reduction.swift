func reduceBandwidth(matrix: [[Bool]]) -> [Int] {
    let degs = degrees(matrix)

    let sortedVertices = (0..<matrix.count).sort {
        // As of Swift 2.2, sort is not stable. The second condition makes the sort stable for
        // easier testability.
        degs[$0] < degs[$1] || degs[$0] == degs[$1] && $0 < $1
    }

    // Convenience function for getting the neighbors of a vertex in increasing degree order.
    func sortedNeighbors(vertex: Int) -> [Int] {
        return sortedVertices.filter { neighbor in
            vertex != neighbor && matrix[vertex][neighbor]
        }
    }

    var permutation = [Int]()
    var queue = [Int]()

    // If the graph was always connected, we could simply init queue to [sortedVertices.first!] and
    // then start dequeuing. But the graph is not necessarily connected, so we need to iterate
    // through every vertex to make sure it has been processed.
    for sortedVertex in sortedVertices {
        queue.append(sortedVertex)

        while !queue.isEmpty {
            // We use removeFirst() and contains() for simplicity, but these functions take linear
            // time and could be optimized.
            let dequeuedVertex = queue.removeFirst()
            if !permutation.contains(dequeuedVertex) {
                permutation.append(dequeuedVertex)
                queue += sortedNeighbors(dequeuedVertex)
            }
        }
    }

    return permutation

    // The same functionality can be implemented without a queue, but it's less clear. See the
    // commented-out code below.
    /*
    var permutation = [Int]()
    for i in 0..<sortedVertices.count {
        if i == permutation.count {
            // Either it's the first vertex, or the graph is not connected. We need to append the
            // next unprocessed vertex.
            let unprocessedVertexIndex = sortedVertices.indexOf { !permutation.contains($0) }!
            permutation.append(sortedVertices[unprocessedVertexIndex])
        }
        permutation += sortedNeighbors(permutation[i]).filter { !permutation.contains($0) }
    }
    return permutation
    */
}

func degrees(matrix: [[Bool]]) -> [Int] {
    return (0..<matrix.count).map { vertex in
        degree(vertex, matrix: matrix)
    }
}

func degree(vertex: Int, matrix: [[Bool]]) -> Int {
    return matrix[vertex].reduce(-1) { degree, adjacent in
        adjacent ? degree + 1 : degree
    }
}
