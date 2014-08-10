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

	if n := h.DeleteMin(); n != nil {
		t.Errorf("Expected n to be nil, was (%d, %q)", n.Key, n.Value)
	}

	h.Insert(7, "seven")
	if h.Empty() {
		t.Error("Expected empty to be false, was true")
	}
	if n := h.DeleteMin(); n.Key != 7 || n.Value != "seven" {
		t.Errorf("Expected (n.Key, n.Value) to be (7, \"seven\"), was (%d, %q)", n.Key, n.Value)
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

	n1 := h.DeleteMin()
	if h.Empty() {
		t.Error("Expected empty to be false, was true")
	}

	n2 := h.DeleteMin()
	if h.Empty() {
		t.Error("Expected empty to be false, was true")
	}

	if n1.Key != 3 || n2.Key != 3 ||
		!(n1.Value == "three" && n2.Value == "three again" ||
			n1.Value == "three again" && n2.Value == "three") {
		t.Errorf("Expected (n1.Key, n1.Value) and (n2.Key, n2.Value) to be (3, \"three\") and "+
			"(3, \"three again\") in any order, was (%d, %q) and (%d, %q)",
			n1.Key, n1.Value, n2.Key, n2.Value)
	}

	if n := h.DeleteMin(); n.Key != 8 || n.Value != "eight" {
		t.Errorf("Expected (n.Key, n.Value) to be (8, \"eight\"), was (%d, %q)", n.Key, n.Value)
	}
	if !h.Empty() {
		t.Error("Expected empty to be true, was false")
	}
}

func TestDecreaseKey(t *testing.T) {
	h := NewPairingHeap()

	h.Insert(7, "seven")
	nine := h.Insert(9, "nine then two")
	h.DecreaseKey(nine, 2)

	if n := h.DeleteMin(); n.Key != 2 || n.Value != "nine then two" {
		t.Errorf("Expected (n.Key, n.Value) to be (2, \"nine then two\"), was (%d, %q)",
			n.Key, n.Value)
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

	if n := a.DeleteMin(); n.Key != 2 || n.Value != "two" {
		t.Errorf("Expected (n.Key, n.Value) to be (2, \"two\"), was (%d, %q)", n.Key, n.Value)
	}

	n1 := a.DeleteMin()
	n2 := a.DeleteMin()
	if n1.Key != 3 || n2.Key != 3 ||
		!(n1.Value == "three" && n2.Value == "three again" ||
			n1.Value == "three again" && n2.Value == "three") {
		t.Errorf("Expected (n1.Key, n1.Value) and (n2.Key, n2.Value) to be (3, \"three\") and "+
			"(3, \"three again\") in any order, was (%d, %q) and (%d, %q)",
			n1.Key, n1.Value, n2.Key, n2.Value)
	}

	if n := a.DeleteMin(); n.Key != 4 || n.Value != "four" {
		t.Errorf("Expected (n.Key, n.Value) to be (4, \"four\"), was (%d, %q)", n.Key, n.Value)
	}

	if n := a.DeleteMin(); n.Key != 7 || n.Value != "seven" {
		t.Errorf("Expected (n.Key, n.Value) to be (7, \"seven\"), was (%d, %q)", n.Key, n.Value)
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

	count := rand.Intn(10000)
	var n *Node
	for i := 0; i < count; i++ {
		n = randomRound(t, h, p, n)
	}

	check(t, h, p)
}

func randomRound(t *testing.T, h *PairingHeap, p *testArray, n *Node) *Node {
	r := rand.Float32()
	switch {
	case r < 0.2 && n != nil && n.Key > 0:
		decreaseKey(h, p, n)
		return nil

	case 0.2 <= r && r < 0.4 && !h.Empty():
		if d := deleteMin(t, h, p); d == n {
			return nil
		}
		return n

	default:
		return insertRandom(h, p)
	}
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

func validHeap(n *Node) bool {
	if n == nil {
		return true
	}
	for _, c := range n.children {
		if c != nil && n.Key > c.Key || !validHeap(c) {
			return false
		}
	}
	return true
}

func insertRandom(h *PairingHeap, p *testArray) *Node {
	k := randomKey(len(p))
	v := randomValue()
	n := h.Insert(k, v)
	p[k] = append(p[k], v)
	return n
}

func decreaseKey(h *PairingHeap, p *testArray, n *Node) {
	oldKey := n.Key
	newKey := rand.Intn(n.Key)
	value := n.Value.(string)

	p[oldKey] = removeString(p[oldKey], value)
	p[newKey] = append(p[newKey], value)

	h.DecreaseKey(n, newKey)
}

func deleteMin(t *testing.T, h *PairingHeap, p *testArray) *Node {
	n := h.DeleteMin()
	a := p[n.Key]
	b := removeString(a, n.Value.(string))
	if len(b) >= len(a) {
		t.Errorf("Could not remove (%d, %q) from array", n.Key, n.Value)
	}
	p[n.Key] = b
	return n
}

func removeString(a []string, s string) []string {
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
