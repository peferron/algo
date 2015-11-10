package maximal_clique

import (
	"reflect"
	"testing"
)

type subtest struct {
	start  int
	clique []int
}

var tests = []struct {
	graph    Graph
	subtests []subtest
}{
	// Graph with only one vertex.
	{
		Graph{
			1,
			[]Edge{},
		},
		[]subtest{
			{0, []int{0}},
		},
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
		[]subtest{
			{0, []int{0, 1, 4}},
			{1, []int{1, 0, 4}},
			{2, []int{2, 1}},
			{3, []int{3, 2}},
			{4, []int{4, 0, 1}},
			{5, []int{5, 3}},
		},
	},
}

func Test(t *testing.T) {
	for testIndex, test := range tests {
		for subtestIndex, subtest := range test.subtests {
			clique := maximalClique(test.graph, subtest.start)
			if !reflect.DeepEqual(clique, subtest.clique) {
				t.Fatalf("In test #%d subtest #%d, for graph %+v and start %d, "+
					"expected maximal clique to be %v, was %v",
					testIndex, subtestIndex, test.graph, subtest.start, subtest.clique, clique)
			}
		}
	}
}
