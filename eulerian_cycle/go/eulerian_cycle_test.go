package eulerian_cycle

import (
	"reflect"
	"testing"
)

var tests = []struct {
	graph Graph
	cycle []int
}{
	{
		// Line
		// Not strongly connected
		// Not same in-degrees as out-degrees
		Graph{
			2,
			true,
			[]Edge{
				{0, 1},
			},
		},
		nil,
	},
	{
		// Line
		// Not strongly connected
		// Same in-degrees as out-degrees
		Graph{
			2,
			true,
			[]Edge{},
		},
		nil,
	},
	{
		// Line
		// Strongly connected
		// Not same in-degrees as out-degrees
		Graph{
			2,
			true,
			[]Edge{
				{0, 1},
				{1, 0},
				{1, 0},
			},
		},
		nil,
	},
	{
		// Line
		// Strongly connected
		// Same in-degrees as out-degrees
		Graph{
			2,
			true,
			[]Edge{
				{0, 1},
				{1, 0},
			},
		},
		[]int{0, 1},
	},
	{
		// Triangle
		// Not strongly connected
		// Not same in-degrees as out-degrees
		Graph{
			3,
			true,
			[]Edge{
				{0, 1},
				{0, 2},
				{1, 2},
			},
		},
		nil,
	},
	{
		// Triangle
		// Not strongly connected
		// Same in-degrees as out-degrees
		Graph{
			3,
			true,
			[]Edge{
				{0, 1},
				{1, 0},
			},
		},
		nil,
	},
	{
		// Triangle
		// Strongly connected
		// Not same in-degrees as out-degrees
		Graph{
			3,
			true,
			[]Edge{
				{0, 1},
				{1, 2},
				{2, 0},
				{2, 1},
			},
		},
		nil,
	},
	{
		// Triangle
		// Strongly connected
		// Same in-degrees as out-degrees
		Graph{
			3,
			true,
			[]Edge{
				{0, 1},
				{1, 2},
				{2, 0},
			},
		},
		[]int{0, 1, 2},
	},
	{
		// Triangle + point
		// Strongly connected
		// Same in-degrees as out-degrees
		Graph{
			4,
			true,
			[]Edge{
				{0, 1},
				{1, 3},
				{1, 2},
				{2, 1},
				{3, 0},
			},
		},
		[]int{0, 1, 2, 1, 3},
	},
	{
		// Five-pointed star
		// Not strongly connected
		// Not same in-degrees as out-degrees
		Graph{
			5,
			true,
			[]Edge{
				{0, 2},
				{1, 3},
				{4, 2},
				{3, 0},
				{4, 1},
			},
		},
		nil,
	},
	{
		// Five-pointed star
		// Not strongly connected
		// Same in-degrees as out-degrees
		Graph{
			5,
			true,
			[]Edge{
				{0, 3},
				{3, 0},
				{1, 2},
				{2, 4},
				{4, 1},
			},
		},
		nil,
	},
	{
		// Five-pointed star
		// Strongly connected
		// Not same in-degrees as out-degrees
		Graph{
			5,
			true,
			[]Edge{
				{0, 2},
				{1, 3},
				{2, 4},
				{3, 0},
				{4, 1},
				{4, 3},
			},
		},
		nil,
	},
	{
		// Five-pointed star
		// Strongly connected
		// Same in-degrees as out-degrees
		Graph{
			5,
			true,
			[]Edge{
				{0, 2},
				{1, 3},
				{2, 4},
				{3, 0},
				{4, 1},
			},
		},
		[]int{0, 2, 4, 1, 3},
	},
}

func Test(t *testing.T) {
	for i, test := range tests {
		if cycle := EulerianCycle(test.graph); !reflect.DeepEqual(cycle, test.cycle) {
			t.Fatalf("In test #%d, for graph %+v, expected cycle to be %v, was %v",
				i, test.graph, test.cycle, cycle)
		}
	}
}
