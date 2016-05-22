package bin_packing

import (
	"reflect"
	"testing"
)

var tests = []struct {
	itemSizes []int
	binSize   int
	packing   [][]int
}{
	{
		[]int{},
		10,
		[][]int{},
	},
	{
		[]int{1},
		10,
		[][]int{
			[]int{1},
		},
	},
	{
		[]int{6, 4},
		10,
		[][]int{
			[]int{6, 4},
		},
	},
	{
		[]int{6, 5},
		10,
		[][]int{
			[]int{6},
			[]int{5},
		},
	},
	{
		[]int{6, 1, 2, 3, 1, 2},
		7,
		[][]int{
			[]int{6, 1},
			[]int{3, 2, 2},
			[]int{1},
		},
	},
	{
		[]int{2, 2, 3, 3},
		5,
		[][]int{
			[]int{3, 2},
			[]int{3, 2},
		},
	},
	{
		[]int{3, 3, 2, 2, 2, 2},
		7,
		[][]int{
			[]int{3, 3},
			[]int{2, 2, 2},
			[]int{2},
		},
	},
}

func Test(t *testing.T) {
	for _, test := range tests {
		if packing := Pack(test.itemSizes, test.binSize); !reflect.DeepEqual(packing, test.packing) {
			t.Errorf("For item sizes %v and bin size %d, expected packing to be %v, but was %v",
				test.itemSizes, test.binSize, test.packing, packing)
		}
	}
}
