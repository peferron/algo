package knapsack_problem

import (
	"reflect"
	"testing"
)

var tests = []struct {
	items     []Item
	maxWeight int
	expected  []Item
}{
	// Basic cases.
	{
		nil,
		1,
		nil,
	},
	{
		[]Item{},
		1,
		[]Item{},
	},
	{
		[]Item{Item{1, 1}},
		0,
		[]Item{},
	},

	// All items have weight = value, and a perfect fill is possible.
	{
		[]Item{Item{1, 1}},
		1,
		[]Item{Item{1, 1}},
	},
	{
		[]Item{Item{1, 1}, Item{1, 1}},
		2,
		[]Item{Item{1, 1}, Item{1, 1}},
	},
	{
		[]Item{Item{1, 1}, Item{2, 2}},
		3,
		[]Item{Item{1, 1}, Item{2, 2}},
	},
	{
		[]Item{Item{1, 1}, Item{2, 2}, Item{3, 3}},
		4,
		[]Item{Item{1, 1}, Item{3, 3}},
	},
	{
		[]Item{Item{1, 1}, Item{2, 2}, Item{2, 2}},
		4,
		[]Item{Item{2, 2}, Item{2, 2}},
	},
	{
		[]Item{Item{3, 3}, Item{5, 5}, Item{7, 7}},
		8,
		[]Item{Item{3, 3}, Item{5, 5}},
	},
	{
		[]Item{Item{2, 2}, Item{4, 4}, Item{5, 5}, Item{8, 8}},
		14,
		[]Item{Item{2, 2}, Item{4, 4}, Item{8, 8}},
	},

	// All items have weight = value, but a perfect fill is impossible.
	{
		[]Item{Item{1, 1}},
		2,
		[]Item{Item{1, 1}},
	},
	{
		[]Item{Item{1, 1}, Item{1, 1}},
		7,
		[]Item{Item{1, 1}, Item{1, 1}},
	},
	{
		[]Item{Item{1, 1}, Item{2, 2}},
		5,
		[]Item{Item{1, 1}, Item{2, 2}},
	},
	{
		[]Item{Item{3, 3}, Item{5, 5}, Item{7, 7}},
		9,
		[]Item{Item{3, 3}, Item{5, 5}},
	},
	{
		[]Item{Item{1, 1}, Item{4, 4}},
		3,
		[]Item{Item{1, 1}},
	},
	{
		[]Item{Item{2, 2}, Item{4, 4}, Item{5, 5}, Item{8, 8}},
		16,
		[]Item{Item{2, 2}, Item{5, 5}, Item{8, 8}},
	},

	// Items can have weight != value.
	{
		[]Item{Item{1, 1}, Item{1, 3}, Item{1, 2}},
		1,
		[]Item{Item{1, 3}},
	},
	{
		[]Item{Item{1, 3}, Item{2, 2}, Item{3, 1}},
		4,
		[]Item{Item{1, 3}, Item{2, 2}},
	},
	{
		[]Item{Item{2, 2}, Item{4, 4}, Item{5, 9}, Item{8, 8}},
		14,
		[]Item{Item{5, 9}, Item{8, 8}},
	},
}

func TestPack(t *testing.T) {
	for _, test := range tests {
		actual := Pack(test.items, test.maxWeight)
		if !reflect.DeepEqual(actual, test.expected) {
			t.Fatalf("With items %v and max weight %d, expected %v, was %v",
				test.items, test.maxWeight, test.expected, actual)
		}
	}
}
