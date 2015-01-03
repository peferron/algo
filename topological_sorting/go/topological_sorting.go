package topological_sorting

type vertexCallback func(x int)

func Sort(g Graph) []int {
	a := NewAdjacencyList(g)

	sorted := []int{}

	processed := make([]bool, len(a))
	process := func(x int) {
		if processed[x] {
			return
		}
		processed[x] = true
		// Vertices are processed in reverse topological order. To bring back the correct order,
		// each vertex must be prepended instead of appended.
		// Unfortunately, Go does not have a very clean syntax for prepending elements.
		sorted = append([]int{x}, sorted...)
	}

	for i := range a {
		a.DepthFirstSearch(i, process)
	}

	return sorted
}
