package strongly_connected_components

type Graph struct {
	VertexCount int
	Directed    bool
	Edges       []Edge
}

type Edge struct {
	X int
	Y int
}

type AdjacencyList [][]int

type VertexCallback func(x int)

func NewAdjacencyList(g Graph) AdjacencyList {
	a := make(AdjacencyList, g.VertexCount)
	for _, edge := range g.Edges {
		insertEdge(a, edge.X, edge.Y, g.Directed)
	}
	return a
}

func insertEdge(a AdjacencyList, x, y int, directed bool) {
	a[x] = append(a[x], y)
	if !directed {
		insertEdge(a, y, x, true)
	}
}

func (a AdjacencyList) DepthFirstSearch(start int, late VertexCallback, discovered []bool) {
	if discovered[start] {
		return
	}
	discovered[start] = true
	for _, neighbor := range a[start] {
		a.DepthFirstSearch(neighbor, late, discovered)
	}
	late(start)
}
