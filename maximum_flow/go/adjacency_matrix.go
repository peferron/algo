package maximum_flow

type Graph struct {
	VertexCount int
	Directed    bool
	Edges       []Edge
}

type Edge struct {
	X        int
	Y        int
	Capacity int
}

type AdjacencyMatrix [][]int

func NewAdjacencyMatrix(g Graph) AdjacencyMatrix {
	a := newEmptyAdjacencyMatrix(g.VertexCount)
	for _, edge := range g.Edges {
		a.insertEdge(edge, g.Directed)
	}
	return a
}

func newEmptyAdjacencyMatrix(n int) AdjacencyMatrix {
	a := make(AdjacencyMatrix, n)
	for x := range a {
		a[x] = make([]int, n)
		// Keep the default int value of 0. For network flow applications, an edge with capacity 0
		// might as well not exist at all.
	}
	return a
}

func (a AdjacencyMatrix) insertEdge(edge Edge, directed bool) {
	a[edge.X][edge.Y] = edge.Capacity
	if !directed {
		reversed := Edge{edge.Y, edge.X, edge.Capacity}
		a.insertEdge(reversed, directed)
	}
}

func (a AdjacencyMatrix) BreadthFirstSearch(start int, callback func(Edge) bool) {
	visited := make([]bool, len(a))
	visited[start] = true

	queue := []int{start}

	for len(queue) > 0 {
		// Dequeue first element.
		x := queue[0]
		queue = queue[1:]

		for y := 0; y < len(a); y++ {
			if visited[y] || a[x][y] == 0 {
				continue
			}
			visited[y] = true
			queue = append(queue, y)
			// The edge callback can return true to abort the current graph traversal.
			if callback(Edge{x, y, a[x][y]}) {
				return
			}
		}
	}
}
