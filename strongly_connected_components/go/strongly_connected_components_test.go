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
				{0, 1},
			},
		},
		[]int{0, 1},
	},
	{
		Graph{
			2,
			true,
			[]Edge{
				{0, 1},
				{1, 0},
			},
		},
		[]int{0, 0},
	},
	{
		Graph{
			3,
			true,
			[]Edge{
				{0, 1},
				{1, 0},
				{2, 1},
			},
		},
		[]int{1, 1, 0},
	},
	{
		Graph{
			8,
			true,
			[]Edge{
				{0, 1},
				{1, 2},
				{1, 4},
				{1, 5},
				{2, 3},
				{2, 6},
				{3, 2},
				{3, 7},
				{4, 0},
				{4, 5},
				{5, 6},
				{6, 5},
				{7, 3},
				{7, 6},
			},
		},
		[]int{0, 0, 1, 1, 0, 2, 2, 1},
	},
	{
		Graph{
			8,
			true,
			[]Edge{
				{0, 1},
				{1, 2},
				{1, 3},
				{1, 4},
				{2, 0},
				{3, 0},
				{3, 5},
				{3, 7},
				{4, 5},
				{5, 6},
				{6, 4},
				{7, 5},
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
