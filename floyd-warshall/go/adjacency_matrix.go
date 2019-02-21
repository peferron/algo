package floyd_warshall

import "math"

type Graph struct {
	VertexCount int
	Directed    bool
	Edges       []Edge
}

type Edge struct {
	X      int
	Y      int
	Weight int64
}

type AdjacencyMatrix [][]int64

func NewAdjacencyMatrix(graph Graph) *AdjacencyMatrix {
	m := newEmptyAdjacencyMatrix(graph.VertexCount)
	for _, edge := range graph.Edges {
		m.insertEdge(edge, graph.Directed)
	}
	return m
}

// newEmptyAdjacencyMatrix returns a new adjacency matrix m of size n*n, with edge weights
// initialized to 0 for every m[i][i] with 0 < i < n, and to math.MaxInt64 for everything else.
func newEmptyAdjacencyMatrix(n int) *AdjacencyMatrix {
	m := make(AdjacencyMatrix, n)
	for i := range m {
		m[i] = make([]int64, n)
		for j := range m[i] {
			if i != j {
				m[i][j] = math.MaxInt64
			}
		}
	}
	return &m
}

func (m *AdjacencyMatrix) insertEdge(edge Edge, directed bool) {
	(*m)[edge.X][edge.Y] = edge.Weight
	if !directed {
		(*m)[edge.Y][edge.X] = edge.Weight
	}
}
