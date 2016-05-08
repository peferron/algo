package hash_table

import (
	"math/rand"
	"testing"
)

var chars = []byte("01234567890abcdefghijklmnopqrstuvwxyz")

func TestBasicSequence(t *testing.T) {
	h := NewHashTable(10)

	if _, ok := h.Get("abc"); ok {
		t.Error("Expected ok to be false, was true")
	}

	h.Set("abc", 5)
	if v, ok := h.Get("abc"); !ok || v != 5 {
		t.Errorf("Expected (ok, v) to be (true, 5), was (%t, %d)", ok, v)
	}

	// Check that deleting a non-existing key doesn't crash.
	h.Del("aaa")
	h.Del("zzz")

	h.Set("abc", 7)
	if v, ok := h.Get("abc"); !ok || v != 7 {
		t.Errorf("Expected (ok, v) to be (true, 7), was (%t, %d)", ok, v)
	}

	h.Set("def", 9)
	if v, ok := h.Get("abc"); !ok || v != 7 {
		t.Errorf("Expected (ok, v) to be (true, 7), was (%t, %d)", ok, v)
	}
	if v, ok := h.Get("def"); !ok || v != 9 {
		t.Errorf("Expected (ok, v) to be (true, 9), was (%t, %d)", ok, v)
	}

	h.Del("abc")
	if _, ok := h.Get("abc"); ok {
		t.Error("Expected ok to be false, was true")
	}
	if v, ok := h.Get("def"); !ok || v != 9 {
		t.Errorf("Expected (ok, v) to be (true, 9), was (%t, %d)", ok, v)
	}
}

func TestRandomSequences(t *testing.T) {
	for i := 0; i < 100 && !t.Failed(); i++ {
		testRandomSequence(t)
	}
}

func testRandomSequence(t *testing.T) {
	h := NewHashTable(100)
	m := map[string]int{}
	a := []string{}

	count := rand.Intn(1000)
	for i := 0; i < count; i++ {
		randomOperation(h, m, &a)
		if rand.Float32() < 0.2 {
			delRandom(h, m, &a)
			continue
		}
		setRandom(h, m, &a)
	}

	validate(t, h, m, a)
}

func validate(t *testing.T, h *HashTable, m map[string]int, a []string) {
	for _, k := range a {
		if v, ok := h.Get(k); !ok || v != m[k] {
			t.Errorf("On Get(%q), expected (ok, v) to be (true, %d), was (%t, %d)", k, m[k], ok, v)
		}
	}
}

func randomOperation(h *HashTable, m map[string]int, a *[]string) {
	r := rand.Float32()
	switch {
	case r < 0.2:
		delRandom(h, m, a)
	default:
		setRandom(h, m, a)
	}
}

func setRandom(h *HashTable, m map[string]int, a *[]string) {
	k := randomKey()
	v := randomValue()
	h.Set(k, v)
	if _, ok := m[k]; !ok {
		(*a) = append(*a, k)
	}
	m[k] = v
}

func delRandom(h *HashTable, m map[string]int, a *[]string) {
	l := len(*a)
	if l <= 0 {
		return
	}
	i := rand.Intn(l)
	k := (*a)[i]
	h.Del(k)
	delete(m, k)
	(*a)[i] = (*a)[l-1]
	(*a) = (*a)[:l-1]
}

func randomKey() string {
	l := 1 + rand.Intn(10)
	c := len(chars)
	s := []byte{}
	for i := 0; i < l; i++ {
		s = append(s, chars[rand.Intn(c)])
	}
	return string(s)
}

func randomValue() int {
	return rand.Int()
}
