package binary_search_tree

import (
	"math/rand"
	"sort"
	"testing"
)

var chars = []byte("01234567890abcdefghijklmnopqrstuvwxyz")

func TestBasic(t *testing.T) {
	s := NewBst()

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

func TestRandom(t *testing.T) {
	for i := 0; i < 100; i++ {
		runRandomTest(t)
	}
}

func runRandomTest(t *testing.T) {
	h := NewBst()
	m := map[string]int{}
	a := []string{}

	for i := 0; i < 10000; i++ {
		if rand.Float32() < 0.2 {
			delRandom(h, m, &a)
			continue
		}
		setRandom(h, m, &a)
	}

	check(t, h, m, a)
}

func check(t *testing.T, s *Bst, m map[string]int, a []string) {
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
		if k := a[i]; d.Key != k || d.Value != m[k] {
			t.Errorf("Expected data at index #%d to have key %q and value %d, was %q and %d",
				i, k, m[k], d.Key, d.Value)
		}
	}
}

func setRandom(s *Bst, m map[string]int, a *[]string) {
	k := randomKey()
	v := randomValue()
	s.Set(k, v)
	if _, ok := m[k]; !ok {
		(*a) = append(*a, k)
	}
	m[k] = v
}

func delRandom(s *Bst, m map[string]int, a *[]string) {
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
