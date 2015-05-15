package eulerian_cycle

func EulerianCycle(g Graph) []int {
	if !g.Directed {
		panic("This algorithm only supports directed graphs")
	}

	// A directed graph contains an Eulerian cycle if and only if:
	// - It is strongly connected;
	// - And each vertex has the same in-degree as out-degree.
	if !stronglyConnected(g) || !sameInDegreesAsOutDegrees(g) {
		return nil
	}

	return findEulerianCycle(g.Edges)
}

func stronglyConnected(g Graph) bool {
	// A directed graph is strongly connected if and only if all vertices can reach, and are
	// reachable, from a given vertex.
	x := 0
	return canReachEntireGraph(g, x) && canReachEntireGraph(reverse(g), x)
}

func canReachEntireGraph(g Graph, from int) bool {
	n := 0
	NewAdjacencyList(g).DepthFirstSearch(from, func(x int) {
		n++
	})
	return n == g.VertexCount
}

func reverse(g Graph) Graph {
	reversedEdges := make([]Edge, len(g.Edges))
	for i, edge := range g.Edges {
		reversedEdges[i] = Edge{edge.Y, edge.X}
	}
	return Graph{g.VertexCount, g.Directed, reversedEdges}
}

func sameInDegreesAsOutDegrees(g Graph) bool {
	degrees := make([]int, g.VertexCount)
	for _, edge := range g.Edges {
		degrees[edge.X]--
		degrees[edge.Y]++
	}
	for _, degree := range degrees {
		if degree != 0 {
			return false
		}
	}
	return true
}

func findEulerianCycle(edges []Edge) []int {
	eulerianCycle := []int{}
	visited := make([]bool, len(edges))

	// The visitEdges call below will return a cycle, starting and ending at the vertex 0.
	// Explanation from http://en.wikipedia.org/wiki/Eulerian_path#Hierholzer.27s_algorithm:
	// "It is not possible to get stuck at any vertex other than [0], because the even degree of all
	// vertices ensures that, when the trail enters another vertex w there must be an unused edge
	// leaving w. The tour formed in this way is a closed tour, but may not cover all the vertices
	// and edges of the initial graph."
	path := visitEdges(edges, visited, 0)

	for len(path) > 0 {
		// Move the last edge of path into the eulerian cycle. This builds the eulerian cycle in
		// reverse order, so to get the correct final order we need to prepend the edge instead of
		// appending it.
		popped := path[len(path)-1]
		path = path[:len(path)-1]
		eulerianCycle = prepend(eulerianCycle, popped.X)

		// The visitEdges call below will again return a cycle, starting and ending at popped.X.
		// That's because each vertex in the graph of unvisited edges still maintains the Eulerian
		// property of in-degree == out-degree, so the same reasoning as above still applies.
		//
		// Note that if path is not empty, popped.X is equal to path[len(path)-1].Y, so path will
		// still be a valid continuous path even after being extended by the new cycle.
		path = append(path, visitEdges(edges, visited, popped.X)...)
	}

	return eulerianCycle
}

// visitEdges builds a path of unvisited edges, starting at the vertex start, and marking the edges
// of the path as visited. When the path cannot be extended with unvisited edges anymore, visitEdges
// returns the path.
func visitEdges(edges []Edge, visited []bool, start int) []Edge {
	for i, edge := range edges {
		if !visited[i] && edge.X == start {
			visited[i] = true
			return append([]Edge{edge}, visitEdges(edges, visited, edge.Y)...)
		}
	}
	return nil
}

func prepend(a []int, v int) []int {
	return append([]int{v}, a...)
}
