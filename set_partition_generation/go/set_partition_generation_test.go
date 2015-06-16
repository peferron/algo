package set_partition_generation

import (
	"reflect"
	"testing"
)

var basicTests = []struct {
	n        int
	expected []Partition
}{
	{
		1,
		[]Partition{
			Partition{
				Block{1},
			},
		},
	},
	{
		2,
		[]Partition{
			Partition{
				Block{1, 2},
			},
			Partition{
				Block{1},
				Block{2},
			},
		},
	},
	{
		3,
		[]Partition{
			Partition{
				Block{1, 2, 3},
			},
			Partition{
				Block{1, 2},
				Block{3},
			},
			Partition{
				Block{1, 3},
				Block{2},
			},
			Partition{
				Block{1},
				Block{2, 3},
			},
			Partition{
				Block{1},
				Block{2},
				Block{3},
			},
		},
	},
	{
		4,
		[]Partition{
			Partition{
				Block{1, 2, 3, 4},
			},
			Partition{
				Block{1, 2, 3},
				Block{4},
			},
			Partition{
				Block{1, 2, 4},
				Block{3},
			},
			Partition{
				Block{1, 2},
				Block{3, 4},
			},
			Partition{
				Block{1, 2},
				Block{3},
				Block{4},
			},
			Partition{
				Block{1, 3, 4},
				Block{2},
			},
			Partition{
				Block{1, 3},
				Block{2, 4},
			},
			Partition{
				Block{1, 3},
				Block{2},
				Block{4},
			},
			Partition{
				Block{1, 4},
				Block{2, 3},
			},
			Partition{
				Block{1},
				Block{2, 3, 4},
			},
			Partition{
				Block{1},
				Block{2, 3},
				Block{4},
			},
			Partition{
				Block{1, 4},
				Block{2},
				Block{3},
			},
			Partition{
				Block{1},
				Block{2, 4},
				Block{3},
			},
			Partition{
				Block{1},
				Block{2},
				Block{3, 4},
			},
			Partition{
				Block{1},
				Block{2},
				Block{3},
				Block{4},
			},
		},
	},
}

func TestBasic(t *testing.T) {
	for i, test := range basicTests {
		if out := Partitions(test.n); !reflect.DeepEqual(out, test.expected) {
			t.Errorf("In test #%d with n = %d, expected output to be %v, was %v",
				i, test.n, test.expected, out)
		}
	}
}

func Test7(t *testing.T) {
	if out := Partitions(7); len(out) != 877 {
		t.Errorf("Expected output length to be 877, was %d", len(out))
	}
}
