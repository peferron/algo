package skip_list

import (
	"math/rand"
	"reflect"
	"sort"
	"testing"
)

var chars = []byte("01234567890abcdefghijklmnopqrstuvwxyz")

func TestBasic(t *testing.T) {
	l := NewSkipList()

	if _, ok := l.Get(2); ok {
		t.Error("Expected ok to be false, was true")
	}
	if a := l.All(); !reflect.DeepEqual(a, []Data{}) {
		t.Errorf("Expected a to be [], was %v", a)
	}

	l.Set(2, "two")
	if v, ok := l.Get(2); !ok || v != "two" {
		t.Errorf("Expected (ok, v) to be (true, \"two\"), was (%t, %q)", ok, v)
	}
	if a := l.All(); !reflect.DeepEqual(a, []Data{Data{2, "two"}}) {
		t.Errorf("Expected a to be [(2, \"two\")], was %v", a)
	}

	// Check that deleting a non-existing key doesn't crash.
	l.Del(1)
	l.Del(10)

	l.Set(2, "two again")
	if v, ok := l.Get(2); !ok || v != "two again" {
		t.Errorf("Expected (ok, v) to be (true, \"two again\"), was (%t, %q)", ok, v)
	}

	l.Set(5, "five")
	if v, ok := l.Get(2); !ok || v != "two again" {
		t.Errorf("Expected (ok, v) to be (true, \"two again\"), was (%t, %q)", ok, v)
	}
	if v, ok := l.Get(5); !ok || v != "five" {
		t.Errorf("Expected (ok, v) to be (true, \"five\"), was (%t, %q)", ok, v)
	}
	if a := l.All(); !reflect.DeepEqual(a, []Data{Data{2, "two again"}, Data{5, "five"}}) {
		t.Errorf("Expected a to be [(2, \"two\")], was %v", a)
	}

	l.Del(2)
	if _, ok := l.Get(2); ok {
		t.Error("Expected ok to be false, was true")
	}
	if v, ok := l.Get(5); !ok || v != "five" {
		t.Errorf("Expected (ok, v) to be (true, \"five\"), was (%t, %q)", ok, v)
	}
}

func TestRandom(t *testing.T) {
	for i := 0; i < 100 && !t.Failed(); i++ {
		runRandomTest(t)
	}
}

func runRandomTest(t *testing.T) {
	l := NewSkipList()
	m := map[int]string{}
	a := []int{}

	count := rand.Intn(10000)
	for i := 0; i < count; i++ {
		if rand.Float32() < 0.2 {
			delRandom(l, m, &a)
			continue
		}
		setRandom(l, m, &a)
	}

	check(t, l, m, a)
}

func check(t *testing.T, l *SkipList, m map[int]string, a []int) {
	for _, k := range a {
		if v, ok := l.Get(k); !ok || v != m[k] {
			t.Errorf("On Get(%d), expected (ok, v) to be (true, %q), was (%t, %q)", k, m[k], ok, v)
		}
	}

	all := l.All()
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

func setRandom(l *SkipList, m map[int]string, a *[]int) {
	k := randomKey()
	v := randomValue()
	l.Set(k, v)
	if _, ok := m[k]; !ok {
		(*a) = append(*a, k)
	}
	m[k] = v
}

func delRandom(l *SkipList, m map[int]string, a *[]int) {
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
