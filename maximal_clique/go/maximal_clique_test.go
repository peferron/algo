package maximal_clique

import (
	"reflect"
	"testing"
)

type maximalCliqueSubtest struct {
	vertices []int
	clique   []int
}

var tests = []struct {
	graph          Graph
	maximalCliques []maximalCliqueSubtest
	maximumClique  []int
}{
	// Graph with only one vertex.
	{
		Graph{
			1,
			[]Edge{},
		},
		[]maximalCliqueSubtest{
			{[]int{0}, []int{0}},
		},
		[]int{0},
	},

	// Example taken from https://en.wikipedia.org/wiki/Clique_problem#Definitions
	{
		Graph{
			6,
			[]Edge{
				{0, 1}, {0, 4},
				{1, 2}, {1, 4},
				{2, 3},
				{3, 4}, {3, 5},
			},
		},
		[]maximalCliqueSubtest{
			{[]int{0, 1, 2, 3, 4, 5}, []int{0, 1, 4}},
			{[]int{1, 0, 2, 3, 4, 5}, []int{0, 1, 4}},
			{[]int{2, 0, 1, 3, 4, 5}, []int{1, 2}},
			{[]int{3, 0, 1, 2, 4, 5}, []int{2, 3}},
			{[]int{4, 0, 1, 2, 3, 5}, []int{0, 1, 4}},
			{[]int{5, 0, 1, 2, 3, 4}, []int{3, 5}},
		},
		[]int{0, 1, 4},
	},
}

func TestMaximalClique(t *testing.T) {
	for testIndex, test := range tests {
		for subtestIndex, subtest := range test.maximalCliques {
			clique := MaximalClique(test.graph, subtest.vertices)
			if !reflect.DeepEqual(clique, subtest.clique) {
				t.Fatalf("In test #%d subtest #%d, for graph %+v and vertices %v, "+
					"expected maximal clique to be %v, was %v",
					testIndex, subtestIndex, test.graph, subtest.vertices, subtest.clique, clique)
			}
		}
	}
}

func TestMaximumClique(t *testing.T) {
	for testIndex, test := range tests {
		clique := MaximumClique(test.graph)
		if !reflect.DeepEqual(clique, test.maximumClique) {
			t.Fatalf("In test #%d, for graph %+v, expected maximum clique to be %v, was %v",
				testIndex, test.graph, test.maximumClique, clique)
		}
	}
}
