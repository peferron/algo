package adjacency_matrix

type Info struct {
	VertexCount int
	Edges       []Edge
}

type Edge struct {
	X int
	Y int
}

type AdjacencyMatrix [][]bool

type VertexCallback func(x int)

func NewAdjacencyMatrix(info Info) *AdjacencyMatrix {
	m := initAdjacencyMatrix(info.VertexCount)
	for _, edge := range info.Edges {
		m.insertEdge(edge.X, edge.Y, false)
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

func (m *AdjacencyMatrix) BreadthFirstSearch(start int, f VertexCallback) {
	queue := []int{}
	processed := make([]bool, len(*m))

	queue = append(queue, start)
	processed[start] = true
	f(start)

	for len(queue) > 0 {
		x := queue[0]
		queue = queue[1:]
		for y, connected := range (*m)[x] {
			if !connected || processed[y] {
				continue
			}
			f(y)
			processed[y] = true
			queue = append(queue, y)
		}
	}
}

func (m *AdjacencyMatrix) DepthFirstSearch(start int, f VertexCallback) {
	processed := make([]bool, len(*m))
	m.dfs(start, processed, f)
}

func (m *AdjacencyMatrix) dfs(x int, processed []bool, f VertexCallback) {
	if processed[x] {
		return
	}
	f(x)
	processed[x] = true
	for y, connected := range (*m)[x] {
		if connected {
			m.dfs(y, processed, f)
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
