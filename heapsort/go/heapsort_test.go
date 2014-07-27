package heapsort

import (
	"reflect"
	"testing"
)

var tests = []struct {
	in  []int
	out []int
}{
	{
		nil,
		nil,
	},
	{
		[]int{},
		[]int{},
	},
	{
		[]int{1},
		[]int{1},
	},
	{
		[]int{3, 7, 2, 1, 5, 4, 6, 7},
		[]int{1, 2, 3, 4, 5, 6, 7, 7},
	},
}

func TestSlow(t *testing.T) {
	testSort(t, SlowMaxHeapify)
}

func TestFast(t *testing.T) {
	testSort(t, FastMaxHeapify)
}

func testSort(t *testing.T, f MaxHeapifyFunc) {
	for i, test := range tests {
		a := clone(test.in)
		Sort(a, f)
		if !reflect.DeepEqual(a, test.out) {
			t.Errorf("In test #%d with input slice %v, expected sorted slice to be %v, was %v",
				i, test.in, test.out, a)
		}
	}
}

func clone(a []int) []int {
	if a == nil {
		return nil
	}
	b := make([]int, len(a))
	copy(b, a)
	return b
}
