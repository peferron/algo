package maximal_clique

func maximalClique(g Graph, start int) []int {
	a := NewAdjacencyList(g)
	clique := []int{start}

	for x := range a {
		if x != start && a.adjacent(x, clique) {
			clique = append(clique, x)
		}
	}

	return clique
}

func (a AdjacencyList) adjacent(x int, vertices []int) bool {
	for _, v := range vertices {
		present := false
		for _, y := range a[x] {
			if y == v {
				present = true
				break
			}
		}
		if !present {
			return false
		}
	}
	return true
}
