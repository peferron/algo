package topological_sorting

type vertexCallback func(x int)

func Sort(g Graph) []int {
	a := NewAdjacencyList(g)

	sorted := []int{}
	prepend := func(x int) {
		sorted = append([]int{x}, sorted...)
	}

	discovered := make([]bool, len(a))
	for i := range a {
		depthFirstSearch(a, discovered, i, prepend)
	}

	return sorted
}

func depthFirstSearch(a AdjacencyList, discovered []bool, x int, lateCallback vertexCallback) {
	if discovered[x] {
		return
	}
	discovered[x] = true
	for _, y := range a[x] {
		depthFirstSearch(a, discovered, y, lateCallback)
	}
	lateCallback(x)
}
