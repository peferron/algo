package strongly_connected_components

func StronglyConnectedComponents(g Graph) []int {
	dfsCompletionOrder := traverse(g)
	return label(g, dfsCompletionOrder)
}

// traverse performs depth-first searches starting from arbitrary vertices of g until all vertices have been processed,
// returning a list of vertices in order of their completion (not discovery).
func traverse(g Graph) []int {
	l := NewAdjacencyList(g)
	stack := make([]int, 0, len(l))
	push := func(y int) {
		stack = append(stack, y)
	}

	// Reuse the discovered array to avoid processing the same vertices multiple times.
	discovered := make([]bool, len(l))

	for x := range l {
		l.DepthFirstSearch(x, push, discovered)
	}

	return stack
}

// label returns the connected component number of each vertex in g, using a previously generated DFS completion order.
func label(g Graph, dfsCompletionOrder []int) []int {
	t := NewAdjacencyList(transpose(g))

	components := make([]int, len(t))
	for x := range components {
		components[x] = -1
	}
	currentComponent := 0
	assignComponent := func(x int) {
		components[x] = currentComponent
	}

	// Reuse the discovered array to avoid processing the same vertices multiple times.
	// We could get rid of this array completely, and check components[x] >= 0 instead, but the code is simpler this
	// way.
	discovered := make([]bool, len(t))

	for i := len(dfsCompletionOrder) - 1; i >= 0; i-- {
		x := dfsCompletionOrder[i]
		if components[x] < 0 {
			t.DepthFirstSearch(x, assignComponent, discovered)
			currentComponent++
		}
	}

	return components
}

// transpose returns a copy of g, with the direction of each edge reversed.
func transpose(g Graph) Graph {
	t := make([]Edge, len(g.Edges))

	for i, e := range g.Edges {
		t[i] = Edge{e.Y, e.X}
	}

	return Graph{g.VertexCount, g.Directed, t}
}
