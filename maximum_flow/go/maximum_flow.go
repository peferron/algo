package maximum_flow

// MaximumFlow returns the maximum flow from source to sink in g.
func MaximumFlow(g Graph, source, sink int) int {
	if !g.Directed {
		panic("This maximum flow algorithm only supports directed graphs")
	}

	// r is the residual flow graph of g. Initially, that's just the same as g.
	r := NewAdjacencyMatrix(g)

	flow := 0
	for {
		if pathCapacity := r.addAugmentingPath(source, sink); pathCapacity > 0 {
			flow += pathCapacity
		} else {
			return flow
		}
	}
}

// addAugmentingPath looks for an augmenting path from source to sink in the residual flow graph r.
// If an augmenting path is found, addAugmentingPath updates r to reflect the addition of the
// augmenting path, and returns the capacity of the augmenting path.
// If no augmenting path is found, addAugmentingPath returns 0.
func (r AdjacencyMatrix) addAugmentingPath(source, sink int) int {
	parents := make([]int, len(r))
	for i := range parents {
		parents[i] = -1
	}

	r.BreadthFirstSearch(source, func(edge Edge) bool {
		parents[edge.Y] = edge.X
		// Return true to abort the BFS.
		return edge.Y == sink
	})

	return r.substractPath(parents, sink)
}

// substractPath substracts the path described by parents and end from the residual flow graph r,
// and returns the capacity of the path.
func (r AdjacencyMatrix) substractPath(parents []int, end int) int {
	capacity := r.pathCapacity(parents, end)

	for _, edge := range edges(parents, end) {
		r[edge.X][edge.Y] -= capacity
		r[edge.Y][edge.X] += capacity
	}

	return capacity
}

// pathCapacity returns the capacity of the path described by parents and end in the residual flow
// graph r.
func (r AdjacencyMatrix) pathCapacity(parents []int, end int) int {
	capacity := 0

	for _, edge := range edges(parents, end) {
		if c := r[edge.X][edge.Y]; capacity == 0 || capacity > c {
			capacity = c
		}
	}

	return capacity
}

// edges returns the edges of the path described by parents and end.
func edges(parents []int, end int) []Edge {
	if p := parents[end]; p >= 0 {
		edge := Edge{X: p, Y: end}
		return append(edges(parents, p), edge)
	}
	return nil
}
