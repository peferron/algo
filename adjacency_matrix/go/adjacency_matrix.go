package adjacency_matrix

type Graph struct {
	VertexCount int
	Directed    bool
	Edges       []Edge
}

type Edge struct {
	X int
	Y int
}

type AdjacencyMatrix [][]bool

type VertexCallback func(x int)

func NewAdjacencyMatrix(graph Graph) *AdjacencyMatrix {
	m := initAdjacencyMatrix(graph.VertexCount)
	for _, edge := range graph.Edges {
		m.insertEdge(edge.X, edge.Y, graph.Directed)
	}
	return m
}

func initAdjacencyMatrix(vertexCount int) *AdjacencyMatrix {
	m := make(AdjacencyMatrix, vertexCount)
	for i := range m {
		m[i] = make([]bool, vertexCount)
	}
	return &m
}

func (m *AdjacencyMatrix) insertEdge(x, y int, directed bool) {
	(*m)[x][y] = true
	if !directed {
		m.insertEdge(y, x, true)
	}
}

func (m *AdjacencyMatrix) BreadthFirstSearch(start int, callback VertexCallback) {
	discovered := make([]bool, len(*m))
	queue := []int{}

	discovered[start] = true
	callback(start)
	queue = append(queue, start)

	for len(queue) > 0 {
		x := queue[0]
		queue = queue[1:]
		for y, connected := range (*m)[x] {
			if !connected || discovered[y] {
				continue
			}
			discovered[y] = true
			callback(y)
			queue = append(queue, y)
		}
	}
}

func (m *AdjacencyMatrix) DepthFirstSearch(start int, preOrderCallback VertexCallback) {
	discovered := make([]bool, len(*m))
	m.dfs(start, preOrderCallback, discovered)
}

func (m *AdjacencyMatrix) dfs(x int, preOrderCallback VertexCallback, discovered []bool) {
	if discovered[x] {
		return
	}
	discovered[x] = true
	preOrderCallback(x)
	for y, connected := range (*m)[x] {
		if connected {
			m.dfs(y, preOrderCallback, discovered)
		}
	}
}

// func (m *AdjacencyMatrix) String() string {
// 	var b bytes.Buffer
// 	b.WriteString("\n")
// 	for i, row := range *m {
// 		b.WriteString(fmt.Sprintf("%d: %v\n", i, row))
// 	}
// 	return b.String()
// }
