package topological_sorting

import (
	"reflect"
	"testing"
)

var tests = []struct {
	graph Graph
	sorts [][]int
}{
	{
		Graph{
			7,
			true,
			[]Edge{
				Edge{0, 1},
				Edge{1, 3},
				Edge{1, 2},
				Edge{2, 4},
				Edge{0, 2},
				Edge{4, 3},
				Edge{6, 0},
				Edge{6, 5},
				Edge{2, 5},
				Edge{5, 4},
			},
		},
		[][]int{
			[]int{6, 0, 1, 2, 5, 4, 3},
		},
	},
}

func Test(t *testing.T) {
	for i, test := range tests {
		if s := Sort(test.graph); !contains(test.sorts, s) {
			t.Errorf("In test #%d with input graph %+v, expected topological sort to be one of %v, was %v",
				i, test.graph, test.sorts, s)
		}
	}
}

func contains(sorts [][]int, sort []int) bool {
	for _, s := range sorts {
		if reflect.DeepEqual(s, sort) {
			return true
		}
	}
	return false
}
