package transitive_closure

func TransitiveClosure(a AdjacencyList) AdjacencyList {
	transitiveClosure := NewAdjacencyList(len(a))

	for x := range a {
		a.DepthFirstSearch(x, func(y int) {
			if x != y {
				transitiveClosure[x] = append(transitiveClosure[x], y)
			}
		})
	}

	return transitiveClosure
}
