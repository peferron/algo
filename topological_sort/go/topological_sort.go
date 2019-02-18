package topological_sort

type vertexCallback func(x int)

func Sort(g Graph) []int {
	if !g.Directed {
		panic("Topological sorting only supports directed graphs")
	}

	a := NewAdjacencyList(g)
	sorted := []int{}
	discovered := make([]bool, len(a))

	// Vertices are processed in reverse topological order. We could prepend vertices, but it's faster to append and
	// then reverse at the end.
	process := func(x int) {
		sorted = append(sorted, x)
	}

	for i := range a {
		a.DepthFirstSearch(i, process, discovered)
	}

	reverse(sorted)
	return sorted
}

func reverse(a []int) {
	for i := 0; i < len(a)/2; i++ {
		j := len(a) - 1 - i
		a[i], a[j] = a[j], a[i]
	}
}
