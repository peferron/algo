package clique

type Graph struct {
	VertexCount int
	Edges       []Edge
}

type Edge struct {
	X int
	Y int
}

// MaximalClique processes vertices in order and returns the resulting maximal clique in g.
func MaximalClique(g Graph, vertices []int) []int {
	adjacencyList := make([]BitVector, g.VertexCount)
	for _, edge := range g.Edges {
		adjacencyList[edge.X].Set(edge.Y)
		adjacencyList[edge.Y].Set(edge.X)
	}

	var clique BitVector
	for _, x := range vertices {
		neighbors := adjacencyList[x]
		if clique.Intersect(neighbors) == clique {
			// x is adjacent to all clique vertices. This means x is eligible to join the clique.
			clique.Set(x)
		}
	}

	return clique.Slice()
}

// MaximumClique returns a clique that is hopefully the maximum clique in g.
func MaximumClique(g Graph) []int {
	return MaximalClique(g, VerticesSortedByDecreasingDegree(g))
}
