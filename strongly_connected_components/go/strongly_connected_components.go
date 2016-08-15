package strongly_connected_components

func StronglyConnectedComponents(g Graph) []int {
	labels := label(NewAdjacencyList(g))

	t := NewAdjacencyList(transpose(g))

	// Perform depth-first searches starting from the highest-labelled vertex in t, until all
	// vertices have been processed. Each resulting DFS tree is a strongly connected component.
	components := make([]int, len(t))
	currentComponent := 0
	for {
		max := indexOfMax(labels)
		if labels[max] < 0 {
			return components
		}
		t.DepthFirstSearch(max, func(x int) {
			if labels[x] >= 0 {
				labels[x] = -1
				components[x] = currentComponent
			}
		})
		currentComponent++
	}
}

// label performs depth-first searches starting from arbitrary vertices of l until all vertices have
// been processed, labelling each vertex in order of its completion (not discovery).
func label(l AdjacencyList) []int {
	labels := make([]int, len(l))
	for i := range labels {
		labels[i] = -1
	}

	currentLabel := 0
	labelVertex := func(x int) {
		if labels[x] < 0 {
			labels[x] = currentLabel
			currentLabel++
		}
	}

	for i := range l {
		l.DepthFirstSearch(i, labelVertex)
	}

	return labels
}

// transpose returns a copy of g, with the direction of each edge reversed.
func transpose(g Graph) Graph {
	t := make([]Edge, len(g.Edges))
	for i, e := range g.Edges {
		t[i] = Edge{e.Y, e.X}
	}
	return Graph{g.VertexCount, g.Directed, t}
}

// indexOfMax returns the index of the highest element in a, or 0 if a is empty.
func indexOfMax(a []int) int {
	m := 0
	for i, v := range a {
		if v > a[m] {
			m = i
		}
	}
	return m
}
