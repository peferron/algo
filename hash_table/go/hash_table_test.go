package hash_table

import "testing"

func TestHashTable(t *testing.T) {
	h := NewHashTable(10)

	if _, ok := h.get("abc"); ok {
		t.Error("Expected ok to be true, was false")
	}

	h.set("abc", 5)
	if v, ok := h.get("abc"); !ok || v != 5 {
		t.Errorf("Expected (ok, v) to be (true, 5), was (%t, %d)", ok, v)
	}

	h.set("abc", 7)
	if v, ok := h.get("abc"); !ok || v != 7 {
		t.Errorf("Expected (ok, v) to be (true, 7), was (%t, %d)", ok, v)
	}

	h.set("def", 9)
	if v, ok := h.get("def"); !ok || v != 9 {
		t.Errorf("Expected (ok, v) to be (true, 9), was (%t, %d)", ok, v)
	}

	h.delete("abc")
	if _, ok := h.get("abc"); ok {
		t.Error("Expected ok to be true, was false")
	}
	if v, ok := h.get("def"); !ok || v != 9 {
		t.Errorf("Expected (ok, v) to be (true, 9), was (%t, %d)", ok, v)
	}
}
