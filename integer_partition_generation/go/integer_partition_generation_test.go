package integer_partition_generation

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
			{1},
		},
	},
	{
		2,
		[]Partition{
			{2},
			{1, 1},
		},
	},
	{
		3,
		[]Partition{
			{3},
			{2, 1},
			{1, 1, 1},
		},
	},
	{
		4,
		[]Partition{
			{4},
			{3, 1},
			{2, 2},
			{2, 1, 1},
			{1, 1, 1, 1},
		},
	},
	{
		5,
		[]Partition{
			{5},
			{4, 1},
			{3, 2},
			{3, 1, 1},
			{2, 2, 1},
			{2, 1, 1, 1},
			{1, 1, 1, 1, 1},
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
