package floyd_warshall

import (
	"math"
	"reflect"
	"testing"
)

var tests = []struct {
	graph     Graph
	distances [][]int64
}{
	{
		Graph{
			0,
			true,
			[]Edge{},
		},
		[][]int64{},
	},
	{
		Graph{
			1,
			true,
			[]Edge{},
		},
		[][]int64{
			{0},
		},
	},
	{
		Graph{
			2,
			true,
			[]Edge{
				{0, 1, 3},
			},
		},
		[][]int64{
			{0, 3},
			{math.MaxInt64, 0},
		},
	},
	{
		Graph{
			2,
			false,
			[]Edge{
				{0, 1, 3},
			},
		},
		[][]int64{
			{0, 3},
			{3, 0},
		},
	},
	{
		// See an illustration of this example at:
		// http://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm#Example
		Graph{
			4,
			true,
			[]Edge{
				{0, 2, -2},
				{2, 3, 2},
				{3, 1, -1},
				{1, 0, 4},
				{1, 2, 3},
			},
		},
		[][]int64{
			{0, -1, -2, 0},
			{4, 0, 2, 4},
			{5, 1, 0, 2},
			{3, -1, 1, 0},
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
