package set_partition_generation

import (
	"reflect"
	"testing"
)

var basicTests = []struct {
	n        int
	expected []partition
}{
	{
		1,
		[]partition{
			partition{
				block{1},
			},
		},
	},
	{
		2,
		[]partition{
			partition{
				block{1, 2},
			},
			partition{
				block{1},
				block{2},
			},
		},
	},
	{
		3,
		[]partition{
			partition{
				block{1, 2, 3},
			},
			partition{
				block{1, 2},
				block{3},
			},
			partition{
				block{1, 3},
				block{2},
			},
			partition{
				block{1},
				block{2, 3},
			},
			partition{
				block{1},
				block{2},
				block{3},
			},
		},
	},
	{
		4,
		[]partition{
			partition{
				block{1, 2, 3, 4},
			},
			partition{
				block{1, 2, 3},
				block{4},
			},
			partition{
				block{1, 2, 4},
				block{3},
			},
			partition{
				block{1, 2},
				block{3, 4},
			},
			partition{
				block{1, 2},
				block{3},
				block{4},
			},
			partition{
				block{1, 3, 4},
				block{2},
			},
			partition{
				block{1, 3},
				block{2, 4},
			},
			partition{
				block{1, 3},
				block{2},
				block{4},
			},
			partition{
				block{1, 4},
				block{2, 3},
			},
			partition{
				block{1},
				block{2, 3, 4},
			},
			partition{
				block{1},
				block{2, 3},
				block{4},
			},
			partition{
				block{1, 4},
				block{2},
				block{3},
			},
			partition{
				block{1},
				block{2, 4},
				block{3},
			},
			partition{
				block{1},
				block{2},
				block{3, 4},
			},
			partition{
				block{1},
				block{2},
				block{3},
				block{4},
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
