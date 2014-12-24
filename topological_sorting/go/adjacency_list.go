package topological_sorting

type Graph struct {
	VertexCount int
	Edges       []Edge
}

type Edge struct {
	X int
	Y int
}

type AdjacencyList [][]int

func NewAdjacencyList(g Graph) AdjacencyList {
	a := make(AdjacencyList, g.VertexCount)
	for _, edge := range g.Edges {
		a[edge.X] = append(a[edge.X], edge.Y)
	}
	return a
}
