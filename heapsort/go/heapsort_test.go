package heapsort

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

func TestBasicInputsSlow(t *testing.T) {
	testBasicInputs(t, SlowMaxHeapify)
}

func TestBasicInputsFast(t *testing.T) {
	testBasicInputs(t, FastMaxHeapify)
}

func TestRandomInputsSlow(t *testing.T) {
	testRandomInputs(t, SlowMaxHeapify)
}

func TestRandomInputsFast(t *testing.T) {
	testRandomInputs(t, FastMaxHeapify)
}

func testBasicInputs(t *testing.T, f MaxHeapifyFunc) {
	for i, test := range basicTests {
		a := clone(test.in)
		Sort(a, f)
		if !reflect.DeepEqual(a, test.out) {
			t.Errorf("In test #%d with input slice %v, expected sorted slice to be %v, was %v",
				i, test.in, test.out, a)
		}
	}
}

func testRandomInputs(t *testing.T, f MaxHeapifyFunc) {
	for i := 0; i < 1000 && !t.Failed(); i++ {
		testRandomInput(t, f)
	}
}

func testRandomInput(t *testing.T, f MaxHeapifyFunc) {
	in := randomInts()
	a := clone(in)
	Sort(a, f)
	if !sort.IntsAreSorted(a) {
		t.Errorf("In random test with input slice %v, got unsorted slice %v", in, a)
	}
}

func randomInts() []int {
	n := rand.Intn(1000)
	a := make([]int, n)
	for i := 0; i < n; i++ {
		// Use n as the upper bound to produce some duplicates.
		a[i] = rand.Intn(n)
	}
	return a
}

func clone(a []int) []int {
	if a == nil {
		return nil
	}
	b := make([]int, len(a))
	copy(b, a)
	return b
}
