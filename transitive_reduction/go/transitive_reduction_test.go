package transitive_reduction

import (
	"reflect"
	"sort"
	"testing"
)

var tests = []struct {
	graph               AdjacencyList
	transitiveReduction AdjacencyList
}{
	{
		graph: AdjacencyList{
			[]int{},
		},
		transitiveReduction: AdjacencyList{
			[]int{},
		},
	},
	{
		graph: AdjacencyList{
			[]int{},
			[]int{},
		},
		transitiveReduction: AdjacencyList{
			[]int{},
			[]int{},
		},
	},
	{
		graph: AdjacencyList{
			[]int{1},
			[]int{},
		},
		transitiveReduction: AdjacencyList{
			[]int{1},
			[]int{},
		},
	},
	{
		graph: AdjacencyList{
			[]int{1},
			[]int{},
			[]int{1},
		},
		transitiveReduction: AdjacencyList{
			[]int{1},
			[]int{},
			[]int{1},
		},
	},
	{
		graph: AdjacencyList{
			[]int{1, 2},
			[]int{2},
			[]int{},
		},
		transitiveReduction: AdjacencyList{
			[]int{1, 2}, // Not optimal: the edge from 0 to 2 could be removed.
			[]int{2},
			[]int{},
		},
	},
	{
		graph: AdjacencyList{
			[]int{1, 2},
			[]int{2, 0},
			[]int{0, 1},
		},
		transitiveReduction: AdjacencyList{
			[]int{1},
			[]int{2},
			[]int{0},
		},
	},
	{
		graph: AdjacencyList{
			[]int{1, 5},
			[]int{0, 2, 4},
			[]int{3, 4, 7},
			[]int{1, 7},
			[]int{5, 6, 7},
			[]int{6},
			[]int{4},
			[]int{},
		},
		transitiveReduction: AdjacencyList{
			[]int{1, 5},
			[]int{2},
			[]int{3, 7},
			[]int{0},
			[]int{5, 7},
			[]int{6},
			[]int{4},
			[]int{},
		},
	},
	{
		graph: AdjacencyList{
			[]int{3, 6},
			[]int{2, 4, 5},
			[]int{4, 5, 1},
			[]int{6},
			[]int{5, 1, 2},
			[]int{1, 2, 4},
			[]int{},
			[]int{},
		},
		transitiveReduction: AdjacencyList{
			[]int{3, 6}, // Not optimal: the edge from 0 to 6 could be removed.
			[]int{2},
			[]int{4},
			[]int{6},
			[]int{5},
			[]int{1},
			[]int{},
			[]int{},
		},
	},
}

func (a AdjacencyList) sort() {
	for _, neighbors := range a {
		sort.Ints(neighbors)
	}
}

func Test(t *testing.T) {
	for _, test := range tests {
		actual := TransitiveReduction(test.graph)
		actual.sort()

		expected := test.transitiveReduction
		expected.sort()

		if !reflect.DeepEqual(actual, expected) {
			t.Errorf("For graph %v, expected transitive reduction to be %v, but was %v", test.graph,
				expected, actual)
		}
	}
}
