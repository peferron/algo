package integer_partition_generation

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
			partition{1},
		},
	},
	{
		2,
		[]partition{
			partition{2},
			partition{1, 1},
		},
	},
	{
		3,
		[]partition{
			partition{3},
			partition{2, 1},
			partition{1, 1, 1},
		},
	},
	{
		4,
		[]partition{
			partition{4},
			partition{3, 1},
			partition{2, 2},
			partition{2, 1, 1},
			partition{1, 1, 1, 1},
		},
	},
	{
		5,
		[]partition{
			partition{5},
			partition{4, 1},
			partition{3, 2},
			partition{3, 1, 1},
			partition{2, 2, 1},
			partition{2, 1, 1, 1},
			partition{1, 1, 1, 1, 1},
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

func Test20(t *testing.T) {
	if out := Partitions(20); len(out) != 627 {
		t.Errorf("Expected output length to be 627, was %d", len(out))
	}
}
