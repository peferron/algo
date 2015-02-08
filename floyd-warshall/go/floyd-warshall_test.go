package floyd_warshall

import (
	"reflect"
	"testing"
)

var tests = []struct {
	graph     Graph
	distances [][]float64
}{
	{
		Graph{
			0,
			true,
			[]Edge{},
		},
		[][]float64{},
	},
	{
		Graph{
			1,
			true,
			[]Edge{},
		},
		[][]float64{
			[]float64{0},
		},
	},
	{
		Graph{
			2,
			true,
			[]Edge{
				Edge{0, 1, 3},
			},
		},
		[][]float64{
			[]float64{0, 3},
			[]float64{Inf, 0},
		},
	},
	{
		Graph{
			2,
			false,
			[]Edge{
				Edge{0, 1, 3},
			},
		},
		[][]float64{
			[]float64{0, 3},
			[]float64{3, 0},
		},
	},
	{
		// See an illustration of this example at:
		// http://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm#Example
		Graph{
			4,
			true,
			[]Edge{
				Edge{0, 2, -2},
				Edge{2, 3, 2},
				Edge{3, 1, -1},
				Edge{1, 0, 4},
				Edge{1, 2, 3},
			},
		},
		[][]float64{
			[]float64{0, -1, -2, 0},
			[]float64{4, 0, 2, 4},
			[]float64{5, 1, 0, 2},
			[]float64{3, -1, 1, 0},
		},
	},
}

func TestDistances(t *testing.T) {
	for i, test := range tests {
		if distances := Distances(test.graph); !reflect.DeepEqual(distances, test.distances) {
			t.Errorf("In test #%d with input graph %+v, expected distances to be %v, was %v",
				i, test.graph, test.distances, distances)
		}
	}
}
