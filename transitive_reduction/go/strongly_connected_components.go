package transitive_reduction

func StronglyConnectedComponents(a AdjacencyList) (indexes []int, count int) {
	labels := label(a)
	t := a.Transpose()

	// Perform depth-first searches starting from the highest-labelled vertex in t, until all vertices have been
	// processed. Each resulting DFS tree is a strongly connected component.
	componentIndexes := make([]int, len(t))
	currentComponentIndex := 0
	assignComponent := func(x int) {
		labels[x] = -1
		componentIndexes[x] = currentComponentIndex
	}

	// Reuse the discovered array to avoid processing the same vertices multiple times.
	// We could get rid of this array completely, and check labels[x] >= 0 instead, but the code is simpler this way.
	discovered := make([]bool, len(t))

	for {
		max := indexOfMax(labels)
		if labels[max] < 0 {
			return componentIndexes, currentComponentIndex
		}
		t.DepthFirstSearch(max, assignComponent, discovered)
		currentComponentIndex++
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
