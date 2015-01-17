package strongly_connected_components

import (
	"reflect"
	"testing"
)

var tests = []struct {
	graph      Graph
	components []int
}{
	{
		Graph{
			1,
			true,
			[]Edge{},
		},
		[]int{0},
	},
	{
		Graph{
			2,
			true,
			[]Edge{},
		},
		[]int{1, 0},
	},
	{
		Graph{
			2,
			true,
			[]Edge{
				Edge{0, 1},
			},
		},
		[]int{0, 1},
	},
	{
		Graph{
			2,
			true,
			[]Edge{
				Edge{0, 1},
				Edge{1, 0},
			},
		},
		[]int{0, 0},
	},
	{
		Graph{
			3,
			true,
			[]Edge{
				Edge{0, 1},
				Edge{1, 0},
				Edge{2, 1},
			},
		},
		[]int{1, 1, 0},
	},
	{
		Graph{
			8,
			true,
			[]Edge{
				Edge{0, 1},
				Edge{1, 2},
				Edge{1, 4},
				Edge{1, 5},
				Edge{2, 3},
				Edge{2, 6},
				Edge{3, 2},
				Edge{3, 7},
				Edge{4, 0},
				Edge{4, 5},
				Edge{5, 6},
				Edge{6, 5},
				Edge{7, 3},
				Edge{7, 6},
			},
		},
		[]int{0, 0, 1, 1, 0, 2, 2, 1},
	},
	{
		Graph{
			8,
			true,
			[]Edge{
				Edge{0, 1},
				Edge{1, 2},
				Edge{1, 3},
				Edge{1, 4},
				Edge{2, 0},
				Edge{3, 0},
				Edge{3, 5},
				Edge{3, 7},
				Edge{4, 5},
				Edge{5, 6},
				Edge{6, 4},
				Edge{7, 5},
			},
		},
		[]int{0, 0, 0, 0, 2, 2, 2, 1},
	},
}

func Test(t *testing.T) {
	for _, test := range tests {
		if c := StronglyConnectedComponents(test.graph); !reflect.DeepEqual(c, test.components) {
			t.Fatalf("For graph %+v, expected strongly connected components to be %v, was %v",
				test.graph, test.components, c)
		}
	}
}
