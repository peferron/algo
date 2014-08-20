package suffix_array

import (
	"reflect"
	"testing"
)

func TestFirstOccurrence(t *testing.T) {
	s := "aba ghhg defabax"

	if i := FirstOccurrence(s, "bad"); i != -1 {
		t.Errorf("Expected first occurrence of \"bad\" to be -1, was %d", i)
	}

	if i := FirstOccurrence(s, "ba"); i != 1 {
		t.Errorf("Expected first occurrence of \"ba\" to be 1, was %d", i)
	}
}

func TestAllOccurrences(t *testing.T) {
	s := "aba ghhg defabax"

	if a := AllOccurrences(s, "bad"); !reflect.DeepEqual(a, []int{}) {
		t.Errorf("Expected occurrences of \"ba\" to be [], was %v", a)
	}

	if a := AllOccurrences(s, "ba"); !reflect.DeepEqual(a, []int{1, 13}) {
		t.Errorf("Expected occurrences of \"ba\" to be [1, 13], was %v", a)
	}
}
