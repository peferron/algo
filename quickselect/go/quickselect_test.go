package quickselect

import (
	"math/rand"
	"sort"

	"testing"
)

var basicTests = []struct {
	a        []int
	k        int
	expected int
}{
	{
		[]int{1},
		0, 1,
	},
	{
		[]int{1, 2},
		0, 1,
	},
	{
		[]int{1, 2},
		1, 2,
	},
	{
		[]int{2, 1},
		0, 1,
	},
	{
		[]int{2, 1},
		1, 2,
	},
	{
		[]int{1, 3, 2},
		0, 1,
	},
	{
		[]int{1, 3, 2},
		1, 2,
	},
	{
		[]int{1, 3, 2},
		2, 3,
	},
}

func TestBasic(t *testing.T) {
	for i, test := range basicTests {

		if v := Select(test.a, test.k); v != test.expected {
			t.Errorf("In test #%d with a = %v and k = %d, expected result to be %d, was %d",
				i, test.a, test.k, test.expected)
		}
	}
}

func TestRandom(t *testing.T) {
	for i := 0; i < 1000 && !t.Failed(); i++ {
		runRandomTest(t)
	}
}

func runRandomTest(t *testing.T) {
	a := randomInts()

	c := clone(a)
	sort.Ints(c)

	for i, expected := range c {
		if v := Select(a, i); v != expected {
			t.Errorf("In random test with a = %v and k = %d, expected result to be %d, was %d",
				a, i, expected, v)
		}
	}
}

func randomInts() []int {
	n := 1 + rand.Intn(100)
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
