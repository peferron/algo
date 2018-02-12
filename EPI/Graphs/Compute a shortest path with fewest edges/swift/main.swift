public typealias Edge = (x: Int, y: Int, length: Int)
public typealias Graph = (vertexCount: Int, directed: Bool, edges: [Edge])

private struct Distance {
    let length: Int
    let count: Int
}

private func + (a: Distance, b: Distance) -> Distance {
    return Distance(length: a.length + b.length, count: a.count + b.count)
}

private func < (a: Distance, b: Distance) -> Bool {
    return a.length < b.length || a.length == b.length && a.count < b.count
}

private typealias AdjacencyList = [[(y: Int, distance: Distance)]]

public func shortestPath(from start: Int, to end: Int, in graph: Graph) -> [Int]? {
    var list = adjacencyList(graph)
    var visited = [Bool](repeating: false, count: graph.vertexCount)
    var distances = [Int: Distance]()
    var parents = [Int: Int]()

    // Initialization.
    distances[start] = Distance(length: 0, count: 0)

    while let x = unvisitedVertexWithLowestDistance(visited: visited, distances: distances) {
        if x == end {
            break
        }

        for (y, distance) in list[x] {
            let distanceToYThroughX = distances[x]! + distance

            if distances[y] == nil || distanceToYThroughX < distances[y]! {
                distances[y] = distanceToYThroughX
                parents[y] = x
            }
        }

        visited[x] = true
    }

    return reconstructPath(from: start, to: end, parents: parents)
}

private func adjacencyList(_ graph: Graph) -> AdjacencyList {
    var list = AdjacencyList(repeating: [], count: graph.vertexCount)

    for (x, y, length) in graph.edges {
        let distance = Distance(length: length, count: 1)
        list[x].append((y, distance))

        if !graph.directed {
            list[y].append((x, distance))
        }
    }

    return list
}

private func unvisitedVertexWithLowestDistance(visited: [Bool], distances: [Int: Distance]) -> Int? {
    return (0..<visited.count)
        .filter { x in !visited[x] && distances[x] != nil }
        .min { (x, y) in distances[x]! < distances[y]! }
}

private func reconstructPath(from start: Int, to end: Int, parents: [Int: Int]) -> [Int]? {
    var path = [end]

    while let p = parents[path.last!] {
        path.append(p)
    }

    return path.last! == start ? path.reversed() : nil
}
