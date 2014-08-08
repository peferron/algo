package splay_tree

import (
	"math/rand"
	"sort"
	"testing"
)

var chars = []byte("01234567890abcdefghijklmnopqrstuvwxyz")

func TestBasic(t *testing.T) {
	s := NewSplayTree()

	if _, ok := s.Get("abc"); ok {
		t.Error("Expected ok to be false, was true")
	}

	s.Set("abc", 5)
	if v, ok := s.Get("abc"); !ok || v != 5 {
		t.Errorf("Expected (ok, v) to be (true, 5), was (%t, %d)", ok, v)
	}

	s.Set("abc", 7)
	if v, ok := s.Get("abc"); !ok || v != 7 {
		t.Errorf("Expected (ok, v) to be (true, 7), was (%t, %d)", ok, v)
	}

	s.Set("def", 9)
	if v, ok := s.Get("abc"); !ok || v != 7 {
		t.Errorf("Expected (ok, v) to be (true, 7), was (%t, %d)", ok, v)
	}
	if v, ok := s.Get("def"); !ok || v != 9 {
		t.Errorf("Expected (ok, v) to be (true, 9), was (%t, %d)", ok, v)
	}

	s.Del("abc")
	if _, ok := s.Get("abc"); ok {
		t.Error("Expected ok to be false, was true")
	}
	if v, ok := s.Get("def"); !ok || v != 9 {
		t.Errorf("Expected (ok, v) to be (true, 9), was (%t, %d)", ok, v)
	}
}

func TestSplay(t *testing.T) {
	e := &node{Data{"e", 0}, nil, nil}
	f := &node{Data{"f", 0}, e, nil}
	c := &node{Data{"c", 0}, nil, nil}
	d := &node{Data{"d", 0}, c, f}
	h := &node{Data{"h", 0}, nil, nil}
	g := &node{Data{"g", 0}, d, h}
	j := &node{Data{"j", 0}, nil, nil}
	i := &node{Data{"i", 0}, g, j}
	a := &node{Data{"a", 0}, nil, nil}
	b := &node{Data{"b", 0}, a, i}

	s := &SplayTree{b}

	s.Get("f")

	if f.left != b || f.right != g ||
		b.left != a || b.right != d ||
		a.left != nil || a.right != nil ||
		d.left != c || d.right != e ||
		c.left != nil || c.right != nil ||
		e.left != nil || e.right != nil ||
		g.left != nil || g.right != i ||
		i.left != h || i.right != j ||
		h.left != nil || h.right != nil ||
		j.left != nil || j.right != nil {
		t.Error("Incorrect shape after splay operation")
	}
}

func TestRandom(t *testing.T) {
	for i := 0; i < 100; i++ {
		runRandomTest(t)
	}
}

func runRandomTest(t *testing.T) {
	s := NewSplayTree()
	m := map[string]int{}
	a := []string{}

	for i := 0; i < 10000; i++ {
		if rand.Float32() < 0.2 {
			delRandom(s, m, &a)
			continue
		}
		setRandom(s, m, &a)
	}

	check(t, s, m, a)
}

func check(t *testing.T, s *SplayTree, m map[string]int, a []string) {
	for _, k := range a {
		if v, ok := s.Get(k); !ok || v != m[k] {
			t.Errorf("Expected (ok, v) to be (true, %d), was (%t, %d)", m[k], ok, v)
		}
	}

	all := s.All()
	if len(all) != len(a) {
		t.Errorf("Expected t.all() to have len %d, was %d", len(a), len(all))
	}
	sort.Strings(a)
	for i, d := range all {
		if k := a[i]; d.key != k || d.value != m[k] {
			t.Errorf("Expected data at index #%d to have key %q and value %d, was %q and %d",
				i, k, m[k], d.key, d.value)
		}
	}
}

func setRandom(s *SplayTree, m map[string]int, a *[]string) {
	k := randomKey()
	v := randomValue()
	s.Set(k, v)
	if _, ok := m[k]; !ok {
		(*a) = append(*a, k)
	}
	m[k] = v
}

func delRandom(s *SplayTree, m map[string]int, a *[]string) {
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

func randomKey() string {
	l := len(chars)
	s := []byte{}
	for i := 0; i < 3; i++ {
		s = append(s, chars[rand.Intn(l)])
	}
	return string(s)
}

func randomValue() int {
	return rand.Int()
}
