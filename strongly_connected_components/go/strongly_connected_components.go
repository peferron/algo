package strongly_connected_components

func StronglyConnectedComponents(g Graph) []int {
	labels := label(NewAdjacencyList(g))
	t := NewAdjacencyList(transpose(g))

	// Perform depth-first searches starting from the highest-labelled vertex in t, until all vertices have been
	// processed. Each resulting DFS tree is a strongly connected component.
	components := make([]int, len(t))
	currentComponent := 0
	assignComponent := func(x int) {
		labels[x] = -1
		components[x] = currentComponent
	}

	// Reuse the discovered array to avoid processing the same vertices multiple times.
	// We could get rid of this array completely, and check labels[x] >= 0 instead, but the code is simpler this way.
	discovered := make([]bool, len(t))

	for {
		max := indexOfMax(labels)
		if labels[max] < 0 {
			return components
		}
		t.DepthFirstSearch(max, assignComponent, discovered)
		currentComponent++
	}
}

// label performs depth-first searches starting from arbitrary vertices of l until all vertices have been processed,
// labelling each vertex in order of its completion (not discovery).
func label(l AdjacencyList) []int {
	labels := make([]int, len(l))
	for i := range labels {
		labels[i] = -1
	}

	currentLabel := 0
	labelVertex := func(x int) {
		labels[x] = currentLabel
		currentLabel++
	}

	// Reuse the discovered array to avoid processing the same vertices multiple times.
	discovered := make([]bool, len(l))

	for i := range l {
		l.DepthFirstSearch(i, labelVertex, discovered)
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
