package transitive_closure

func TransitiveClosure(a AdjacencyList) AdjacencyList {
	transitiveClosure := make(AdjacencyList, len(a))

	for x := range a {
		transitiveClosure[x] = []int{}

		a.DepthFirstSearch(x, func(y int) {
			if x != y {
				transitiveClosure[x] = append(transitiveClosure[x], y)
			}
		})
	}

	return transitiveClosure
}
