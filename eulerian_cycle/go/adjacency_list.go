package eulerian_cycle

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
		a.insertEdge(edge, g.Directed)
	}
	return a
}

func (a AdjacencyList) insertEdge(edge Edge, directed bool) {
	a[edge.X] = append(a[edge.X], edge.Y)
	if !directed {
		reverse := Edge{edge.Y, edge.X}
		a.insertEdge(reverse, true)
	}
}

func (a AdjacencyList) DepthFirstSearch(start int, late VertexCallback) {
	discovered := make([]bool, len(a))
	a.dfs(start, late, discovered)
}

func (a AdjacencyList) dfs(x int, late VertexCallback, discovered []bool) {
	if discovered[x] {
		return
	}
	discovered[x] = true
	for _, y := range a[x] {
		a.dfs(y, late, discovered)
	}
	late(x)
}
