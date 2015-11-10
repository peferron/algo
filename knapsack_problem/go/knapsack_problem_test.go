package knapsack_problem

import (
	"reflect"
	"testing"
)

var tests = []struct {
	items     []Item
	maxWeight int
	solution  []int
}{
	// Basic cases.
	{
		nil,
		1,
		[]int{},
	},
	{
		[]Item{},
		1,
		[]int{},
	},
	{
		[]Item{{1, 1}},
		0,
		[]int{},
	},

	// All items have weight = value, and a perfect fill is possible.
	{
		[]Item{{1, 1}},
		1,
		[]int{0},
	},
	{
		[]Item{{1, 1}, {1, 1}},
		2,
		[]int{0, 1},
	},
	{
		[]Item{{1, 1}, {2, 2}},
		3,
		[]int{0, 1},
	},
	{
		[]Item{{1, 1}, {2, 2}, {3, 3}},
		4,
		[]int{0, 2},
	},
	{
		[]Item{{1, 1}, {2, 2}, {2, 2}},
		4,
		[]int{1, 2},
	},
	{
		[]Item{{3, 3}, {5, 5}, {7, 7}},
		8,
		[]int{0, 1},
	},
	{
		[]Item{{2, 2}, {4, 4}, {5, 5}, {8, 8}},
		14,
		[]int{0, 1, 3},
	},

	// All items have weight = value, but a perfect fill is impossible.
	{
		[]Item{{1, 1}},
		2,
		[]int{0},
	},
	{
		[]Item{{1, 1}, {1, 1}},
		7,
		[]int{0, 1},
	},
	{
		[]Item{{1, 1}, {2, 2}},
		5,
		[]int{0, 1},
	},
	{
		[]Item{{3, 3}, {5, 5}, {7, 7}},
		9,
		[]int{0, 1},
	},
	{
		[]Item{{1, 1}, {4, 4}},
		3,
		[]int{0},
	},
	{
		[]Item{{2, 2}, {4, 4}, {5, 5}, {8, 8}},
		16,
		[]int{0, 2, 3},
	},

	// Items can have weight != value.
	{
		[]Item{{1, 1}, {1, 3}, {1, 2}},
		1,
		[]int{1},
	},
	{
		[]Item{{1, 3}, {2, 2}, {3, 1}},
		4,
		[]int{0, 1},
	},
	{
		[]Item{{2, 2}, {4, 4}, {5, 9}, {8, 8}},
		14,
		[]int{2, 3},
	},
}

func Test(t *testing.T) {
	for _, test := range tests {
		if s := Solve(test.items, test.maxWeight); !reflect.DeepEqual(s, test.solution) {
			t.Fatalf("For items %v and max weight %d, expected the solution to be %v, was %v",
				test.items, test.maxWeight, test.solution, s)
		}
	}
}
