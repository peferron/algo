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
				{0, 1, 5},
			},
		},
		[]problem{
			{0, 1, 5},
			{1, 0, 0},
		},
	},
	{
		Graph{
			2,
			false,
			[]Edge{
				{0, 1, 5},
			},
		},
		[]problem{
			{0, 1, 5},
			{1, 0, 5},
		},
	},
	{
		Graph{
			3,
			true,
			[]Edge{
				{0, 1, 5},
				{1, 2, 3},
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
			false,
			[]Edge{
				{0, 1, 5},
				{1, 2, 3},
			},
		},
		[]problem{
			{0, 1, 5},
			{0, 2, 3},
			{1, 0, 5},
			{1, 2, 3},
			{2, 0, 3},
			{2, 1, 3},
		},
	},
	{
		Graph{
			3,
			true,
			[]Edge{
				{0, 1, 5},
				{0, 2, 4},
				{1, 2, 3},
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
		Graph{
			3,
			false,
			[]Edge{
				{0, 1, 5},
				{0, 2, 4},
				{1, 2, 3},
			},
		},
		[]problem{
			{0, 1, 8},
			{0, 2, 7},
			{1, 0, 8},
			{1, 2, 7},
			{2, 0, 7},
			{2, 1, 7},
		},
	},
	{
		// This example is illustrated and explained at:
		// http://community.topcoder.com/tc?module=Static&d1=tutorials&d2=maxFlow
		Graph{
			7,
			true,
			[]Edge{
				{0, 1, 3},
				{0, 2, 1},
				{1, 3, 3},
				{2, 3, 5},
				{2, 4, 4},
				{3, 6, 2},
				{4, 5, 2},
				{5, 6, 3},
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
	{
		Graph{
			7,
			false,
			[]Edge{
				{0, 1, 3},
				{0, 2, 1},
				{1, 3, 3},
				{2, 3, 5},
				{2, 4, 4},
				{3, 6, 2},
				{4, 5, 2},
				{5, 6, 3},
			},
		},
		[]problem{
			{0, 3, 4},
			{0, 6, 4},
			{1, 2, 4},
			{2, 6, 4},
			{3, 5, 4},
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
