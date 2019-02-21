package floyd_warshall

import "math"

func Distances(g Graph) [][]int64 {
	m := *NewAdjacencyMatrix(g)

	for k := range m {
		for i := range m {
			for j := range m {
				if m[i][k] < math.MaxInt64 && m[k][j] < math.MaxInt64 {
					d := m[i][j]            // Distance from i to j without passing through k.
					dk := m[i][k] + m[k][j] // Distance from i to j via k.
					if d > dk {
						m[i][j] = dk
					}
				}
			}
		}
	}

	return m
}
