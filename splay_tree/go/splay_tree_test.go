package splay_tree

import (
	"fmt"
	"math/rand"
	"reflect"
	"sort"
	"strings"
	"testing"
)

// Logging functions

func (n *node) String() string {
	if n == nil {
		return "[nil]"
	}
	return fmt.Sprintf("{%d: %d}", n.data.Key, n.data.Value)
}

func (t *SplayTree) Log() {
	log(t.root, 0)
}

func log(n *node, indent int) {
	fmt.Printf("%s%v\n", strings.Repeat(" ", indent), n)
	if n != nil {
		log(n.left, indent+2)
		log(n.right, indent+2)
	}
}

// Tests

var chars = []byte("01234567890abcdefghijklmnopqrstuvwxyz")

func TestBasicSequence(t *testing.T) {
	s := NewSplayTree()

	if _, ok := s.Get(2); ok {
		t.Error("Expected ok to be false, was true")
	}
	if a := s.All(); !reflect.DeepEqual(a, []Data{}) {
		t.Errorf("Expected a to be [], was %v", a)
	}

	s.Set(2, "two")
	if v, ok := s.Get(2); !ok || v != "two" {
		t.Errorf("Expected (ok, v) to be (true, \"two\"), was (%t, %q)", ok, v)
	}
	if a := s.All(); !reflect.DeepEqual(a, []Data{Data{2, "two"}}) {
		t.Errorf("Expected a to be [(2, \"two\")], was %v", a)
	}

	// Check that deleting a non-existing key doesn't crash.
	s.Del(1)
	s.Del(10)

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
	if a := s.All(); !reflect.DeepEqual(a, []Data{Data{2, "two again"}, Data{5, "five"}}) {
		t.Errorf("Expected a to be [(2, \"two\")], was %v", a)
	}

	s.Del(2)
	if _, ok := s.Get(2); ok {
		t.Error("Expected ok to be false, was true")
	}
	if v, ok := s.Get(5); !ok || v != "five" {
		t.Errorf("Expected (ok, v) to be (true, \"five\"), was (%t, %q)", ok, v)
	}
}

func TestSplay(t *testing.T) {
	five := &node{Data{5, "five"}, nil, nil}
	six := &node{Data{6, "six"}, five, nil}
	three := &node{Data{3, "three"}, nil, nil}
	four := &node{Data{4, "four"}, three, six}
	eight := &node{Data{8, "eight"}, nil, nil}
	seven := &node{Data{7, "seven"}, four, eight}
	ten := &node{Data{10, "ten"}, nil, nil}
	nine := &node{Data{9, "nine"}, seven, ten}
	one := &node{Data{1, "one"}, nil, nil}
	two := &node{Data{2, "two"}, one, nine}

	s := &SplayTree{two}

	s.Get(6)

	if six.left != two || six.right != seven ||
		two.left != one || two.right != four ||
		one.left != nil || one.right != nil ||
		four.left != three || four.right != five ||
		three.left != nil || three.right != nil ||
		five.left != nil || five.right != nil ||
		seven.left != nil || seven.right != nine ||
		nine.left != eight || nine.right != ten ||
		eight.left != nil || eight.right != nil ||
		ten.left != nil || ten.right != nil {
		t.Error("Incorrect shape after splay operation")
	}
}

func TestRandomSequences(t *testing.T) {
	for i := 0; i < 100 && !t.Failed(); i++ {
		testRandomSequence(t)
	}
}

func testRandomSequence(t *testing.T) {
	s := NewSplayTree()
	m := map[int]string{}
	a := []int{}

	count := rand.Intn(10000)
	for i := 0; i < count; i++ {
		randomOperation(s, m, &a)
	}

	validate(t, s, m, a)
}

func validate(t *testing.T, s *SplayTree, m map[int]string, a []int) {
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

func randomOperation(s *SplayTree, m map[int]string, a *[]int) {
	r := rand.Float32()
	switch {
	case r < 0.2:
		delRandom(s, m, a)
	default:
		setRandom(s, m, a)
	}
}

func setRandom(s *SplayTree, m map[int]string, a *[]int) {
	k := randomKey()
	v := randomValue()
	s.Set(k, v)
	if _, ok := m[k]; !ok {
		(*a) = append(*a, k)
	}
	m[k] = v
}

func delRandom(s *SplayTree, m map[int]string, a *[]int) {
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
