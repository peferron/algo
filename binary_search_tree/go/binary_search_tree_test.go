package binary_search_tree

import (
	"math/rand"
	"sort"
	"testing"
)

var chars = []byte("01234567890abcdefghijklmnopqrstuvwxyz")

func TestBasic(t *testing.T) {
	s := NewBst()

	if _, ok := s.Get(2); ok {
		t.Error("Expected ok to be false, was true")
	}

	s.Set(2, "two")
	if v, ok := s.Get(2); !ok || v != "two" {
		t.Errorf("Expected (ok, v) to be (true, \"two\"), was (%t, %q)", ok, v)
	}

	s.Set(2, "two again")
	if v, ok := s.Get(2); !ok || v != "two again" {
		t.Errorf("Expected (ok, v) to be (true, \"two again\"), was (%t, %q)", ok, v)
	}

	s.Set(5, "five")
	if v, ok := s.Get(2); !ok || v != "two again" {
		t.Errorf("Expected (ok, v) to be (true, \"two again\"), was (%t, %q)", ok, v)
	}
	if v, ok := s.Get(5); !ok || v != "five" {
		t.Errorf("Expected (ok, v) to be (true, \"five\"), was (%t, %q)", ok, v)
	}

	s.Del(2)
	if _, ok := s.Get(2); ok {
		t.Error("Expected ok to be false, was true")
	}
	if v, ok := s.Get(5); !ok || v != "five" {
		t.Errorf("Expected (ok, v) to be (true, \"five\"), was (%t, %q)", ok, v)
	}
}

func TestRandom(t *testing.T) {
	for i := 0; i < 100; i++ {
		runRandomTest(t)
	}
}

func runRandomTest(t *testing.T) {
	s := NewBst()
	m := map[int]string{}
	a := []int{}

	count := rand.Intn(10000)
	for i := 0; i < count; i++ {
		if rand.Float32() < 0.2 {
			delRandom(s, m, &a)
			continue
		}
		setRandom(s, m, &a)
	}

	check(t, s, m, a)
}

func check(t *testing.T, s *Bst, m map[int]string, a []int) {
	if !validBinarySearchTree(s.root) {
		t.Errorf("Binary search tree structure not respected")
	}

	for _, k := range a {
		if v, ok := s.Get(k); !ok || v != m[k] {
			t.Errorf("On Get(%d), expected (ok, v) to be (true, %q), was (%t, %q)", k, m[k], ok, v)
		}
	}

	all := s.All()
	if len(all) != len(a) {
		t.Errorf("Expected t.all() to have len %d, was %d", len(a), len(all))
	}
	sort.Ints(a)
	for i, d := range all {
		if k := a[i]; d.Key != k || d.Value != m[k] {
			t.Errorf("Expected data at index #%d to have key %d and value %q, was %d and %q",
				i, k, m[k], d.Key, d.Value)
		}
	}
}

func setRandom(s *Bst, m map[int]string, a *[]int) {
	k := randomKey()
	v := randomValue()
	s.Set(k, v)
	if _, ok := m[k]; !ok {
		(*a) = append(*a, k)
	}
	m[k] = v
}

func delRandom(s *Bst, m map[int]string, a *[]int) {
	l := len(*a)
	if l <= 0 {
		return
	}
	i := rand.Intn(l)
	k := (*a)[i]
	s.Del(k)
	delete(m, k)
	(*a)[i] = (*a)[l-1]
	(*a) = (*a)[:l-1]
}

func randomKey() int {
	return rand.Intn(10000)
}

func randomValue() string {
	l := len(chars)
	s := []byte{}
	for i := 0; i < 6; i++ {
		s = append(s, chars[rand.Intn(l)])
	}
	return string(s)
}

func validBinarySearchTree(n *node) bool {
	if n == nil {
		return true
	}
	if n.left != nil && n.left.data.Key >= n.data.Key {
		return false
	}
	if n.right != nil && n.right.data.Key < n.data.Key {
		return false
	}
	return validBinarySearchTree(n.left) && validBinarySearchTree(n.right)
}
