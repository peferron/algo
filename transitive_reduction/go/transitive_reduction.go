package transitive_reduction

func TransitiveReduction(a AdjacencyList) AdjacencyList {
	reduction := NewAdjacencyList(len(a))

	// Compute the strongly connected components of the graph. For convenience, we use two different representations:
	// - `componentIndexes`, which labels each vertex with the index of the component it belongs to;
	// - `components`, which groups together vertices that belong to same component.
	componentIndexes, componentCount := StronglyConnectedComponents(a)
	components := make([][]int, componentCount)
	for x := range a {
		cx := componentIndexes[x]
		components[cx] = append(components[cx], x)
	}

	// Replace each strongly connected component with a simple directed cycle.
	for _, component := range components {
		if l := len(component); l > 1 {
			for i, x := range component {
				y := component[(i+1)%l]
				reduction[x] = append(reduction[x], y)
			}
		}
	}

	// Keep weak connectivity (if any) between strongly connected components.
	weaklyConnected := make([]map[int]bool, componentCount)
	for i := range weaklyConnected {
		weaklyConnected[i] = map[int]bool{}
	}
	for x, neighbors := range a {
		for _, y := range neighbors {
			cx, cy := componentIndexes[x], componentIndexes[y]
			if cx != cy && !weaklyConnected[cx][cy] {
				reduction[x] = append(reduction[x], y)
				weaklyConnected[cx][cy] = true
			}
		}
	}

	return reduction
}
