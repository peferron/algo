package radix_sort

import (
	"math/rand"
	"reflect"
	"sort"
	"testing"
)

var basicTests = []struct {
	in  []int
	out []int
}{
	{
		[]int{},
		[]int{},
	},
	{
		[]int{1},
		[]int{1},
	},
	{
		[]int{1, 3, -2},
		[]int{-2, 1, 3},
	},
	{
		[]int{3, 72, 197, -55, 1567, -4, -6, 2},
		[]int{-55, -6, -4, 2, 3, 72, 197, 1567},
	},
}

func TestBasicInputs(t *testing.T) {
	for i, test := range basicTests {
		if out := Sort(test.in); !reflect.DeepEqual(out, test.out) {
			t.Errorf("In test #%d with input slice %v, expected sorted slice to be %v, was %v",
				i, test.in, test.out, out)
		}
	}
}

func TestRandomInputs(t *testing.T) {
	for i := 0; i < 1000 && !t.Failed(); i++ {
		testRandomInput(t)
	}
}

func testRandomInput(t *testing.T) {
	in := randomInts()
	if out := Sort(in); !sort.IntsAreSorted(out) {
		t.Errorf("In random test with input slice %v, got unsorted slice %v", in, out)
	}
}

func randomInts() []int {
	n := rand.Intn(1000)
	a := make([]int, n)
	for i := 0; i < n; i++ {
		// Generate ints between -n/2 and +n/2 to produce positive numbers, negative numbers, and
		// duplicates.
		a[i] = rand.Intn(n) - n/2
	}
	return a
}
