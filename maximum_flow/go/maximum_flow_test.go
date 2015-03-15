package maximum_flow

import "testing"

type problem struct {
	source int
	sink   int
	flow   int
}

var tests = []struct {
	graph    Graph
	problems []problem
}{
	{
		Graph{
			2,
			true,
			[]Edge{
				Edge{0, 1, 5},
			},
		},
		[]problem{
			{0, 1, 5},
			{1, 0, 0},
		},
	},
	{
		Graph{
			3,
			true,
			[]Edge{
				Edge{0, 1, 5},
				Edge{1, 2, 3},
			},
		},
		[]problem{
			{0, 1, 5},
			{0, 2, 3},
			{1, 0, 0},
			{1, 2, 3},
			{2, 0, 0},
			{2, 1, 0},
		},
	},
	{
		Graph{
			3,
			true,
			[]Edge{
				Edge{0, 1, 5},
				Edge{0, 2, 4},
				Edge{1, 2, 3},
			},
		},
		[]problem{
			{0, 1, 5},
			{0, 2, 7},
			{1, 0, 0},
			{1, 2, 3},
			{2, 0, 0},
			{2, 1, 0},
		},
	},
	{
		// This example is illustrated and explained at:
		// http://community.topcoder.com/tc?module=Static&d1=tutorials&d2=maxFlow
		Graph{
			7,
			true,
			[]Edge{
				Edge{0, 1, 3},
				Edge{0, 2, 1},
				Edge{1, 3, 3},
				Edge{2, 3, 5},
				Edge{2, 4, 4},
				Edge{3, 6, 2},
				Edge{4, 5, 2},
				Edge{5, 6, 3},
			},
		},
		[]problem{
			{0, 3, 4},
			{0, 6, 3},
			{1, 2, 0},
			{2, 6, 4},
			{3, 5, 0},
		},
	},
}

func Test(t *testing.T) {
	for _, test := range tests {
		for _, problem := range test.problems {
			if flow := MaximumFlow(test.graph, problem.source, problem.sink); flow != problem.flow {
				t.Fatalf("For graph %v, expected maximum flow from %d to %d to be %d, but was %d",
					test.graph, problem.source, problem.sink, problem.flow, flow)
			}
		}
	}
}
