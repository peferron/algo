package knapsack

import (
	"reflect"
	"sort"
	"testing"
)

var tests = []struct {
	items    []Item
	capacity int
	expected []Item
}{
	{nil, 1, nil},
	{[]Item{}, 1, []Item{}},
	{[]Item{Item{1}}, 0, []Item{}},
	{[]Item{Item{1}, Item{2}, Item{3}}, 4, []Item{Item{1}, Item{3}}},
	{[]Item{Item{2}, Item{4}, Item{5}, Item{8}}, 14, []Item{Item{2}, Item{4}, Item{8}}},
}

func TestPack(t *testing.T) {
	for _, test := range tests {
		actual := Pack(test.items, test.capacity)
		sortItems(actual)
		if !reflect.DeepEqual(actual, test.expected) {
			t.Errorf("With items %v and capacity %d, expected expected to be %v, was %v",
				test.items, test.capacity, test.expected, actual)
		}
	}
}

func sortItems(a []Item) {
	sort.Sort(items(a))
}

type items []Item

func (a items) Len() int {
	return len(a)
}

func (a items) Swap(i, j int) {
	a[i], a[j] = a[j], a[i]
}

func (a items) Less(i, j int) bool {
	return a[i].size < a[j].size
}
