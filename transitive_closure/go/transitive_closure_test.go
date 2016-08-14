package transitive_closure

import (
	"reflect"
	"sort"
	"testing"
)

var tests = []struct {
	graph             AdjacencyList
	transitiveClosure AdjacencyList
}{
	{
		graph: AdjacencyList{
			[]int{},
		},
		transitiveClosure: AdjacencyList{
			[]int{},
		},
	},
	{
		graph: AdjacencyList{
			[]int{},
			[]int{},
		},
		transitiveClosure: AdjacencyList{
			[]int{},
			[]int{},
		},
	},
	{
		graph: AdjacencyList{
			[]int{1},
			[]int{},
		},
		transitiveClosure: AdjacencyList{
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
		transitiveClosure: AdjacencyList{
			[]int{1},
			[]int{},
			[]int{1},
		},
	},
	{
		graph: AdjacencyList{
			[]int{1},
			[]int{2},
			[]int{},
		},
		transitiveClosure: AdjacencyList{
			[]int{1, 2},
			[]int{2},
			[]int{},
		},
	},
	{
		graph: AdjacencyList{
			[]int{1},
			[]int{2},
			[]int{0},
		},
		transitiveClosure: AdjacencyList{
			[]int{1, 2},
			[]int{2, 0},
			[]int{0, 1},
		},
	},
	{
		graph: AdjacencyList{
			[]int{3},
			[]int{2},
			[]int{4},
			[]int{6},
			[]int{5},
			[]int{1},
			[]int{},
			[]int{},
		},
		transitiveClosure: AdjacencyList{
			[]int{3, 6},
			[]int{2, 4, 5},
			[]int{4, 5, 1},
			[]int{6},
			[]int{5, 1, 2},
			[]int{1, 2, 4},
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
		actual := TransitiveClosure(test.graph)
		actual.sort()

		expected := test.transitiveClosure
		expected.sort()

		if !reflect.DeepEqual(actual, expected) {
			t.Errorf("For graph %v, expected transitive closure to be %v, but was %v", test.graph,
				expected, actual)
		}
	}
}
