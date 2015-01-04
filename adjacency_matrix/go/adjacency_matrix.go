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

func (m *AdjacencyMatrix) BreadthFirstSearch(start int, early VertexCallback) {
	queue := []int{}
	processed := make([]bool, len(*m))

	queue = append(queue, start)
	processed[start] = true
	early(start)

	for len(queue) > 0 {
		x := queue[0]
		queue = queue[1:]
		for y, connected := range (*m)[x] {
			if !connected || processed[y] {
				continue
			}
			early(y)
			processed[y] = true
			queue = append(queue, y)
		}
	}
}

func (m *AdjacencyMatrix) DepthFirstSearch(start int, early VertexCallback) {
	processed := make([]bool, len(*m))
	m.dfs(start, processed, early)
}

func (m *AdjacencyMatrix) dfs(x int, processed []bool, early VertexCallback) {
	if processed[x] {
		return
	}
	early(x)
	processed[x] = true
	for y, connected := range (*m)[x] {
		if connected {
			m.dfs(y, processed, early)
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
