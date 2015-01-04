package topological_sorting

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

func (a AdjacencyList) DepthFirstSearch(x int, lateCallback VertexCallback) {
	discovered := make([]bool, len(a))
	dfs(a, discovered, x, lateCallback)
}

func dfs(a AdjacencyList, discovered []bool, x int, lateCallback VertexCallback) {
	if discovered[x] {
		return
	}
	discovered[x] = true
	for _, y := range a[x] {
		dfs(a, discovered, y, lateCallback)
	}
	lateCallback(x)
}
