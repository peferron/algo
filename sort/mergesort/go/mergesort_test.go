package mergesort

import (
	"reflect"
	"testing"
)

func TestSort(t *testing.T) {
	tests := []struct {
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

	for i, test := range tests {
		a := clone(test.in)
		Sort(a)
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
	for i, v := range a {
		b[i] = v
	}
	return b
}
