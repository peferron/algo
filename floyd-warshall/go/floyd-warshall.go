package floyd_warshall

func Distances(g Graph) [][]float64 {
	m := *NewAdjacencyMatrix(g)

	previous := m
	for k := range m {
		current := NewFloat64Matrix(len(m))
		for i := range m {
			for j := range m {
				current[i][j] = min(
					previous[i][j],                // Distance from i to j without going through k.
					previous[i][k]+previous[k][j], // Distance from i to j going through k.
				)
			}
		}
		previous = current
	}

	return previous
}

// newFloat64Matrix returns a new matrix of float64, of size n*n.
func NewFloat64Matrix(n int) [][]float64 {
	m := make([][]float64, n)
	for i := range m {
		m[i] = make([]float64, n)
	}
	return m
}

// min returns the minimum of x and y.
func min(x, y float64) float64 {
	if x < y {
		return x
	}
	return y
}
