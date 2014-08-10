package pairing_heap

import (
	"math/rand"
	"testing"
)

var chars = []byte("01234567890abcdefghijklmnopqrstuvwxyz")

type testArray [1000][]string

func TestBasic(t *testing.T) {
	h := NewPairingHeap()

	if !h.Empty() {
		t.Error("Expected empty to be true, was false")
	}

	h.Insert(7, "seven")
	if h.Empty() {
		t.Error("Expected empty to be false, was true")
	}
	if k, v := h.DeleteMin(); k != 7 || v != "seven" {
		t.Errorf("Expected (k, v) to be (7, \"seven\"), was (%d, %q)", k, v)
	}
	if !h.Empty() {
		t.Error("Expected empty to be true, was false")
	}

	h.Insert(3, "three")
	if h.Empty() {
		t.Error("Expected empty to be false, was true")
	}

	h.Insert(8, "eight")
	if h.Empty() {
		t.Error("Expected empty to be false, was true")
	}

	h.Insert(3, "three again")
	if h.Empty() {
		t.Error("Expected empty to be false, was true")
	}

	k1, v1 := h.DeleteMin()
	if h.Empty() {
		t.Error("Expected empty to be false, was true")
	}

	k2, v2 := h.DeleteMin()
	if h.Empty() {
		t.Error("Expected empty to be false, was true")
	}

	if k1 != 3 || k2 != 3 ||
		!(v1 == "three" && v2 == "three again" || v1 == "three again" && v2 == "three") {
		t.Errorf("Expected (k1, v1) and (k2, v2) to be (3, \"three\") and (3, \"three again\") "+
			"in any order, was (%d, %q) and (%d, %q)", k1, v1, k2, v2)
	}

	if k, v := h.DeleteMin(); k != 8 || v != "eight" {
		t.Errorf("Expected (k, v) to be (8, \"eight\"), was (%d, %q)", k, v)
	}
	if !h.Empty() {
		t.Error("Expected empty to be true, was false")
	}
}

func TestMerge(t *testing.T) {
	a := NewPairingHeap()
	b := NewPairingHeap()

	a.Insert(7, "seven")
	a.Insert(3, "three")
	a.Insert(2, "two")

	b.Insert(4, "four")
	a.Insert(3, "three again")

	a.Merge(b)

	if k, v := a.DeleteMin(); k != 2 || v != "two" {
		t.Errorf("Expected (k, v) to be (2, \"two\"), was (%d, %q)", k, v)
	}

	k1, v1 := a.DeleteMin()
	k2, v2 := a.DeleteMin()
	if k1 != 3 || k2 != 3 ||
		!(v1 == "three" && v2 == "three again" || v1 == "three again" && v2 == "three") {
		t.Errorf("Expected (k1, v1) and (k2, v2) to be (3, \"three\") and (3, \"three again\") "+
			"in any order, was (%d, %q) and (%d, %q)", k1, v1, k2, v2)
	}

	if k, v := a.DeleteMin(); k != 4 || v != "four" {
		t.Errorf("Expected (k, v) to be (4, \"four\"), was (%d, %q)", k, v)
	}

	if k, v := a.DeleteMin(); k != 7 || v != "seven" {
		t.Errorf("Expected (k, v) to be (7, \"seven\"), was (%d, %q)", k, v)
	}

	if !a.Empty() {
		t.Error("Expected empty to be true, was false")
	}
}

func TestRandom(t *testing.T) {
	for i := 0; i < 100 && !t.Failed(); i++ {
		runRandomTest(t)
	}
}

func runRandomTest(t *testing.T) {
	h := NewPairingHeap()
	p := &testArray{}

	count := rand.Intn(5000)
	for i := 0; i < count; i++ {
		if rand.Float32() < 0.2 {
			deleteMin(t, h, p)
			continue
		}
		insertRandom(h, p)
	}

	check(t, h, p)
}

func check(t *testing.T, h *PairingHeap, p *testArray) {
	if !validHeap(h.root) {
		t.Errorf("Heap structure not respected")
	}
	for !h.Empty() {
		deleteMin(t, h, p)
	}
	for i, v := range p {
		if len(v) > 0 {
			t.Errorf("Array at index #%d is not empty: %v", i, v)
		}
	}
}

func validHeap(n *node) bool {
	if n == nil {
		return true
	}
	for _, c := range n.children {
		if c != nil && n.key > c.key || !validHeap(c) {
			return false
		}
	}
	return true
}

func insertRandom(h *PairingHeap, p *testArray) {
	k := randomKey(len(p))
	v := randomValue()
	h.Insert(k, v)
	p[k] = append(p[k], v)
}

func deleteMin(t *testing.T, h *PairingHeap, p *testArray) {
	if h.Empty() {
		return
	}
	k, v := h.DeleteMin()
	a := p[k]
	b := remove(a, v.(string))
	if len(b) >= len(a) {
		t.Errorf("Could not remove (%d, %q) from array", k, v)
	}
	p[k] = b
}

func remove(a []string, s string) []string {
	for i, v := range a {
		if v == s {
			last := len(a) - 1
			a[i] = a[last]
			return a[:last]
		}
	}
	return a
}

func randomKey(max int) int {
	return rand.Intn(max)
}

func randomValue() string {
	l := len(chars)
	s := []byte{}
	for i := 0; i < 6; i++ {
		s = append(s, chars[rand.Intn(l)])
	}
	return string(s)
}
