package skip_list

import (
	"math/rand"
	"sort"
	"testing"
)

var chars = []byte("01234567890abcdefghijklmnopqrstuvwxyz")

func TestBasic(t *testing.T) {
	l := NewSkipList()

	if _, ok := l.Get("abc"); ok {
		t.Error("Expected ok to be false, was true")
	}

	l.Set("abc", 5)
	if v, ok := l.Get("abc"); !ok || v != 5 {
		t.Errorf("Expected (ok, v) to be (true, 5), was (%t, %d)", ok, v)
	}

	l.Set("abc", 7)
	if v, ok := l.Get("abc"); !ok || v != 7 {
		t.Errorf("Expected (ok, v) to be (true, 7), was (%t, %d)", ok, v)
	}

	l.Set("def", 9)
	if v, ok := l.Get("abc"); !ok || v != 7 {
		t.Errorf("Expected (ok, v) to be (true, 7), was (%t, %d)", ok, v)
	}
	if v, ok := l.Get("def"); !ok || v != 9 {
		t.Errorf("Expected (ok, v) to be (true, 9), was (%t, %d)", ok, v)
	}

	l.Del("abc")
	if _, ok := l.Get("abc"); ok {
		t.Error("Expected ok to be false, was true")
	}
	if v, ok := l.Get("def"); !ok || v != 9 {
		t.Errorf("Expected (ok, v) to be (true, 9), was (%t, %d)", ok, v)
	}
}

func TestRandom(t *testing.T) {
	for i := 0; i < 100; i++ {
		runRandomTest(t)
	}
}

func runRandomTest(t *testing.T) {
	l := NewSkipList()
	m := map[string]int{}
	a := []string{}

	for i := 0; i < 10000; i++ {
		if rand.Float32() < 0.2 {
			delRandom(l, m, &a)
			continue
		}
		setRandom(l, m, &a)
	}

	check(t, l, m, a)
}

func check(t *testing.T, l *SkipList, m map[string]int, a []string) {
	for _, k := range a {
		if v, ok := l.Get(k); !ok || v != m[k] {
			t.Errorf("On Get(%q), expected (ok, v) to be (true, %d), was (%t, %d)", k, m[k], ok, v)
		}
	}

	all := l.All()
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

func setRandom(l *SkipList, m map[string]int, a *[]string) {
	k := randomKey()
	v := randomValue()
	l.Set(k, v)
	if _, ok := m[k]; !ok {
		(*a) = append(*a, k)
	}
	m[k] = v
}

func delRandom(l *SkipList, m map[string]int, a *[]string) {
	length := len(*a)
	if length <= 0 {
		return
	}
	i := rand.Intn(length)
	k := (*a)[i]
	l.Del(k)
	delete(m, k)
	(*a)[i] = (*a)[length-1]
	(*a) = (*a)[:length-1]
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
