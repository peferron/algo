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
	adjacencyList := adjacencyList(g)

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

// adjacencyList returns the adjacency list of g.
func adjacencyList(g Graph) []BitVector {
	a := make([]BitVector, g.VertexCount)
	for _, edge := range g.Edges {
		a[edge.X].Set(edge.Y)
		a[edge.Y].Set(edge.X)
	}
	return a
}

// MaximumClique returns a clique that is hopefully the maximum clique in g.
func MaximumClique(g Graph) []int {
	return MaximalClique(g, VerticesSortedByDecreasingDegree(g))
}
