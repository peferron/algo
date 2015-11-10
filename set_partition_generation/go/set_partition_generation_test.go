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
			{
				{1},
			},
		},
	},
	{
		2,
		[]Partition{
			{
				{1, 2},
			},
			{
				{1},
				{2},
			},
		},
	},
	{
		3,
		[]Partition{
			{
				{1, 2, 3},
			},
			{
				{1, 2},
				{3},
			},
			{
				{1, 3},
				{2},
			},
			{
				{1},
				{2, 3},
			},
			{
				{1},
				{2},
				{3},
			},
		},
	},
	{
		4,
		[]Partition{
			{
				{1, 2, 3, 4},
			},
			{
				{1, 2, 3},
				{4},
			},
			{
				{1, 2, 4},
				{3},
			},
			{
				{1, 2},
				{3, 4},
			},
			{
				{1, 2},
				{3},
				{4},
			},
			{
				{1, 3, 4},
				{2},
			},
			{
				{1, 3},
				{2, 4},
			},
			{
				{1, 3},
				{2},
				{4},
			},
			{
				{1, 4},
				{2, 3},
			},
			{
				{1},
				{2, 3, 4},
			},
			{
				{1},
				{2, 3},
				{4},
			},
			{
				{1, 4},
				{2},
				{3},
			},
			{
				{1},
				{2, 4},
				{3},
			},
			{
				{1},
				{2},
				{3, 4},
			},
			{
				{1},
				{2},
				{3},
				{4},
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
