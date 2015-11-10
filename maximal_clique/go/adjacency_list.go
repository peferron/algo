package maximal_clique

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
		a.insertEdge(edge)
	}
	return a
}

func (a AdjacencyList) insertEdge(edge Edge) {
	a[edge.X] = append(a[edge.X], edge.Y)
	a[edge.Y] = append(a[edge.Y], edge.X)
}
