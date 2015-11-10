package maximal_clique

type Graph struct {
	VertexCount int
	Edges       []Edge
}

type Edge struct {
	X int
	Y int
}

func maximalClique(g Graph, start int) []int {
	adjacencyList := make([]BitVector, g.VertexCount)
	for _, edge := range g.Edges {
		adjacencyList[edge.X].Set(edge.Y)
		adjacencyList[edge.Y].Set(edge.X)
	}

	var clique BitVector
	clique.Set(start)

	for x, neighbors := range adjacencyList {
		if clique.Intersect(neighbors) == clique {
			clique.Set(x)
		}
	}

	return clique.Slice()
}
